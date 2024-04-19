"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const sequelize_1 = require("sequelize");
const scopes_1 = __importDefault(require("../utils/scopes"));
const logger_1 = __importDefault(require("@/logger"));
const SocketService_1 = __importDefault(require("@app/services/SocketService"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class BaseRepository {
    model;
    socketService;
    primaryKeyName = "id";
    constructor(model) {
        this.model = model;
        this.socketService = new SocketService_1.default();
    }
    async safeRun(method) {
        try {
            const dbName = this.model.sequelize?.getDatabaseName();
            let model = this.model;
            if (dbName !== 'sigpres_main') {
                model = TenantConnection_1.default.getConnection()
                    .model(this.model.modelName);
            }
            return await method(model);
        }
        catch (error) {
            logger_1.default.error(JSON.stringify(error));
            throw {
                code: error.code || 500,
                message: error.message
            };
        }
    }
    async getAll(params) {
        return this.safeRun((model) => scopes_1.default.get(model, params));
    }
    async find(key, value, withTrashed, params) {
        return this.safeRun((model) => scopes_1.default.get(model, {
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
        }));
    }
    async findById(dataId, params, withTrashed) {
        return this.safeRun(() => this.find("id", dataId, withTrashed, params));
    }
    async first(params, withTrashed) {
        return this.safeRun((model) => {
            const parameters = {
                order: model.primaryKeyAttribute,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return scopes_1.default.get(model, parameters);
        });
    }
    async last(params, withTrashed) {
        return this.safeRun((model) => {
            const parameters = {
                order: model.primaryKeyAttribute,
                desc: true,
                ...params,
                limit: 1,
                withtrashed: withTrashed,
            };
            return scopes_1.default.get(model, parameters);
        });
    }
    async create(data, trans) {
        return this.safeRun((model) => model.create(data, { transaction: trans }));
    }
    async updateOrCreate(data, trans) {
        const newData = await this.safeRun((model) => model.upsert(data, {
            transaction: trans,
        }));
        return newData[0];
    }
    async bulkCreate(data, trans) {
        return this.safeRun((model) => model.bulkCreate(data, { transaction: trans }));
    }
    async update(data, primaryKey, trans, key) {
        return this.safeRun(async (model) => {
            const { updatedAt, createdAt, deletedAt, id, ...newData } = data;
            await model.update(newData, {
                where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.col(key || model.primaryKeyAttribute), primaryKey),
                transaction: trans,
            });
            const updated = await model.findByPk(primaryKey, { transaction: trans });
            this.socketService.emit(`update${model.tableName}`, updated);
            return updated;
        });
    }
    async delete(primaryKey, trans) {
        return this.safeRun(async (model) => {
            const dataToDelete = await this.find(model.primaryKeyAttribute, primaryKey);
            if (dataToDelete) {
                return dataToDelete.destroy({ transaction: trans });
            }
            return Promise.reject({
                code: 404,
                message: "No se encontró el registro para eliminar"
            });
        });
    }
    async bulkDelete(options, force, trans) {
        return await this.safeRun(async (model) => {
            return await model.destroy({
                ...options,
                transaction: trans,
                force: true
            });
        });
    }
    async bulkUpdate(data, options, trans) {
        return await this.safeRun(async (model) => {
            return await model.update(data, {
                ...options,
                transaction: trans,
            });
        });
    }
    async restore(primaryKey, trans) {
        return this.safeRun(async (model) => {
            const dataToRestore = await this.find(model.primaryKeyAttribute, primaryKey, true);
            return dataToRestore.restore({ transaction: trans });
        });
    }
    async forceDelete(primaryKey, trans) {
        return this.safeRun(async (model) => {
            const dataToForceDelete = await this.find(model.primaryKeyAttribute, primaryKey, true);
            return dataToForceDelete.destroy({
                force: true,
                transaction: trans,
            });
        });
    }
    async validateBeforeInsertRelation(model, id) {
        return this.safeRun(async () => {
            const exists = await model.findByPk(id);
            if (!exists) {
                return Promise.reject({
                    code: 404,
                    message: "No se encontró el registro relacionado"
                });
            }
            return exists;
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map