import {Model, ModelStatic, Sequelize} from "sequelize";
import Scope from "../utils/scopes";
import {IParams} from "../utils/AppInterfaces";
import tools from "../utils/tools";
import logger from "@/logger";

/**
 * @template T - Generic thats extends from model
 *
 */
export class BaseRepository<T extends Model> {
    /**
     * Model used by this repo
     * @protected
     */
    protected model;
    /**
     * Name of col that is primary key. Default: id
     * @private
     */
    private primaryKeyName: string = "id";

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    protected async safeRun(method: () => Promise<any>): Promise<any> {
        try {
            this.primaryKeyName = this.model.primaryKeyAttribute;
            return await method();
        } catch (error: any) {
            logger.error(JSON.stringify(error))
            throw {
                code: error.code || 500,
                message: error.message
            };
        }
    }

    public async getAll(params: IParams): Promise<any> {
        return this.safeRun(() => Scope.get(this.model, params));
    }

    public async find(
        key: string,
        value: string | number | Boolean,
        withTrashed?: boolean,
        params?: IParams
    ): Promise<any> {
        return this.safeRun(() =>
            Scope.get(this.model, {
                ...params,
                page: undefined,
                perpage: undefined,
                order: undefined,
                desc: undefined,
                search: undefined,
                scopes: undefined,
                limit: 1,
                filter: [`${key}:${value}`],
                withtrashed: withTrashed,
            })
        );
    }

    public async findById(
        dataId: number,
        params?: any,
        withTrashed?: boolean
    ): Promise<any> {
        return this.safeRun(() =>
            this.find("id", tools.parseOrZero(dataId), withTrashed, params)
        );
    }

    public async first(params?: any, withTrashed?: boolean): Promise<T> {
        return this.safeRun(() => {
            const parameters: IParams = {
                order: this.model.primaryKeyAttribute,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return Scope.get(this.model, parameters);
        });
    }

    public async last(params?: any, withTrashed?: boolean): Promise<T> {
        return this.safeRun(() => {
            const parameters: IParams = {
                order: this.model.primaryKeyAttribute,
                desc: true,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return Scope.get(this.model, parameters);
        });
    }

    public async create(data: any, trans: any): Promise<T> {
        return this.safeRun(() => this.model.create(data, {transaction: trans}));
    }

    public async updateOrCreate(data: any, trans: any): Promise<T> {
        const newData = await this.safeRun(() => this.model.upsert(data, {
            transaction: trans,
        }));
        return newData[0]
    }

    public async bulkCreate(data: any[], trans: any): Promise<T[]> {
        return this.safeRun(() =>
            this.model.bulkCreate(data, {transaction: trans})
        );
    }

    public async update(
        data: any,
        primaryKey: string | number,
        trans: any,
        key?: string
    ): Promise<T> {
        return this.safeRun(async () => {
            const {updatedAt, createdAt, deletedAt, ...newData} = data;
            await this.model.update(newData, {
                where: Sequelize.where(
                    Sequelize.col(key || this.primaryKeyName),
                    primaryKey
                ),
                transaction: trans,
            });

            return this.model.findByPk(primaryKey, {transaction: trans});
        });
    }

    public async delete(primaryKey: string | number, trans: any): Promise<T> {
        return this.safeRun(async () => {
            const dataToDelete = await this.find(this.primaryKeyName, primaryKey);
            if (dataToDelete) {
                return dataToDelete.destroy({transaction: trans});
            }
            return Promise.reject(
                {
                    code: 404,
                    message: "No se encontró el registro para eliminar"
                }
            )
        });
    }

    public async restore(primaryKey: string | number, trans: any): Promise<T> {
        return this.safeRun(async () => {
            const dataToRestore = await this.find(
                this.primaryKeyName,
                primaryKey,
                true
            );
            return dataToRestore.restore({transaction: trans});
        });
    }

    public async forceDelete(
        primaryKey: string | number,
        trans: any
    ): Promise<T> {
        return this.safeRun(async () => {
            const dataToForceDelete = await this.find(
                this.primaryKeyName,
                primaryKey,
                true
            );
            return dataToForceDelete.destroy({
                force: true,
                transaction: trans,
            });
        });
    }
}
