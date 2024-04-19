import {DestroyOptions, Model, ModelStatic, Sequelize, Transaction, UpdateOptions} from "sequelize";
import Scope from "../utils/scopes";
import {IParams} from "../interfaces/AppInterfaces";
import tools from "../utils/tools";
import logger from "@/logger";
import SocketService from "@app/services/SocketService";
import TenantConnection from "@app/db/TenantConnection";

/**
 * @template T - Generic thats extends from model
 *
 */
export class BaseRepository<T extends Model> {
    protected model;
    protected socketService: SocketService;

    private primaryKeyName: string = "id";

    constructor(model: ModelStatic<T>) {
        this.model = model;

        this.socketService = new SocketService();
    }

    protected async safeRun(method: (model: ModelStatic<any>) => Promise<any>): Promise<any> {
        try {
            const dbName = this.model.sequelize?.getDatabaseName();
            let model=this.model;
            if (dbName !== 'sigpres_main') {
                model =<any> TenantConnection.getConnection()
                    .model((<any>this.model).modelName)!
            }
            return await method(model);
        } catch (error: any) {
            logger.error(JSON.stringify(error))
            throw {
                code: error.code || 500,
                message: error.message
            };
        }
    }

    public async getAll(params: IParams): Promise<any> {
        return this.safeRun((model: ModelStatic<any>) => Scope.get(model, params));
    }

    public async find(
        key: string,
        value: string | number | Boolean,
        withTrashed?: boolean,
        params?: IParams
    ): Promise<any> {
        return this.safeRun((model: ModelStatic<any>) =>
            Scope.get(model, {
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
        dataId: string | string,
        params?: any,
        withTrashed?: boolean
    ): Promise<any> {
        return this.safeRun(() =>
            this.find("id", dataId, withTrashed, params)
        );
    }

    public async first(params?: any, withTrashed?: boolean): Promise<T> {
        return this.safeRun((model: ModelStatic<any>) => {
            const parameters: IParams = {
                order: model.primaryKeyAttribute,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return Scope.get(model, parameters);
        });
    }

    public async last(params?: any, withTrashed?: boolean): Promise<T> {
        return this.safeRun((model: ModelStatic<any>) => {
            const parameters: IParams = {
                order: model.primaryKeyAttribute,
                desc: true,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return Scope.get(model, parameters);
        });
    }

    public async create(data: any, trans: any): Promise<T> {
        return this.safeRun((model: ModelStatic<any>) => model.create(data, {transaction: trans}));
    }

    public async updateOrCreate(data: any, trans: any): Promise<T> {
        const newData = await this.safeRun((model: ModelStatic<any>) => model.upsert(data, {
            transaction: trans,

        }));
        return newData[0]
    }

    public async bulkCreate(data: any[], trans: any): Promise<T[]> {
        return this.safeRun((model: ModelStatic<any>) =>
            model.bulkCreate(data, {transaction: trans})
        );
    }

    public async update(
        data: any,
        primaryKey: string | number,
        trans: any,
        key?: string
    ): Promise<T> {
        return this.safeRun(async (model: ModelStatic<any>) => {
            const {updatedAt, createdAt, deletedAt, id, ...newData} = data;
            await model.update(newData, {
                where: Sequelize.where(
                    Sequelize.col(key || model.primaryKeyAttribute),
                    primaryKey
                ),
                transaction: trans,
            });

            const updated = await model.findByPk(primaryKey, {transaction: trans});
            this.socketService.emit(`update${model.tableName}`, updated)
            return updated;
        });
    }

    public async delete(primaryKey: string | number, trans: any): Promise<T> {
        return this.safeRun(async (model: ModelStatic<any>) => {
            const dataToDelete = await this.find(model.primaryKeyAttribute, primaryKey);
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

    async bulkDelete(options: DestroyOptions, force: boolean, trans: Transaction) {
        return await this.safeRun(async (model: ModelStatic<any>) => {
            return await model.destroy({
                ...options,
                transaction: trans,
                force: true

            })
        })
    }

    async bulkUpdate(data: any, options: UpdateOptions, trans: Transaction) {
        return await this.safeRun(async (model: ModelStatic<any>) => {
            return await model.update(data, {
                ...options,
                transaction: trans,
            })
        })
    }

    public async restore(primaryKey: string | number, trans: any): Promise<T> {
        return this.safeRun(async (model: ModelStatic<any>) => {
            const dataToRestore = await this.find(
                model.primaryKeyAttribute,
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
        return this.safeRun(async (model: ModelStatic<any>) => {
            const dataToForceDelete = await this.find(
                model.primaryKeyAttribute,
                primaryKey,
                true
            );
            return dataToForceDelete.destroy({
                force: true,
                transaction: trans,
            });
        });
    }

    async validateBeforeInsertRelation(model: ModelStatic<any>, id: string): Promise<any> {
        return this.safeRun(async () => {
            const exists = await model.findByPk(id);
            if (!exists) {
                return Promise.reject({
                    code: 404,
                    message: "No se encontró el registro relacionado"
                })
            }
            return exists;
        })
    }


}
