"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tools_1 = __importDefault(require("./tools"));
const moment_1 = __importDefault(require("moment"));
class Scope {
    operators = {
        eq: sequelize_1.Op.eq,
        ne: sequelize_1.Op.ne,
        gt: sequelize_1.Op.gt,
        gte: sequelize_1.Op.gte,
        lt: sequelize_1.Op.lt,
        lte: sequelize_1.Op.lte,
        and: sequelize_1.Op.and,
        or: sequelize_1.Op.or,
        bet: sequelize_1.Op.between,
        like: sequelize_1.Op.like,
        notlike: sequelize_1.Op.notLike,
        ilike: sequelize_1.Op.iLike,
        notilike: sequelize_1.Op.notILike,
        in: sequelize_1.Op.in,
    };
    paginate(perPage, page) {
        if (!isNaN(perPage) && !isNaN(page)) {
            const startIndex = (page - 1) * perPage;
            return {
                offset: tools_1.default.parseOrZero(startIndex),
                limit: tools_1.default.parseOrZero(perPage),
            };
        }
        return {};
    }
    limit(limit) {
        return { limit: tools_1.default.parseOrZero(limit) };
    }
    search(search, cols) {
        if (cols.length > 0) {
            return {
                [sequelize_1.Op.or]: cols.map((col) => {
                    return {
                        [col]: {
                            [sequelize_1.Op.like]: `%${search}%`,
                        },
                    };
                }),
            };
        }
        return {};
    }
    fields(fields, cols) {
        let selections = fields.split(",");
        selections = selections.filter((sel) => cols.includes(sel) || sel == "id");
        if (selections.length > 0) {
            return { attributes: selections };
        }
        else {
            return {};
        }
    }
    isLike(filter, cols) {
        const [field = "", value = "", union = "and"] = filter.split(":");
        let condition = {};
        cols.push("createdBy", "updatedBy");
        if (cols.includes(field)) {
            condition = {
                [field]: { [this.operators["like"]]: `${value}` },
            };
        }
        return {
            union: union,
            condition,
        };
    }
    filter(filter, cols) {
        let filtered = {};
        const and = [];
        const or = [];
        const conditions = {};
        cols.push("createdBy", "updatedBy");
        if (!Array.isArray(filter))
            return {};
        filter.forEach((f) => {
            const parts = f.split(":");
            if (parts.length === 2 && (cols.includes(parts[0]) || parts[0] == "id")) {
                conditions[parts[0]] = parts[1];
            }
            else if (parts.length === 3 &&
                (cols.includes(parts[0]) || parts[0] == "id") &&
                Object.keys(this.operators).includes(parts[1])) {
                const values = parts[2].split(",").map((v) => {
                    if (v.length >= 9 && parts[1] == "bet") {
                        return (0, moment_1.default)(v);
                    }
                    return v;
                });
                conditions[parts[0]] = {
                    [this.operators[parts[1]]]: values,
                };
            }
            else if (parts.length === 4 &&
                (cols.includes(parts[0]) || parts[0] == "id") &&
                Object.keys(this.operators).includes(parts[1])) {
                const values = parts[2].split(",").map((v) => {
                    if (v.length >= 9 && parts[1] == "bet") {
                        return (0, moment_1.default)(v);
                    }
                    return v;
                });
                const filt = {
                    [parts[0]]: { [this.operators[parts[1]]]: values },
                };
                if (parts[3] == "or") {
                    or.push(filt);
                }
                else {
                    and.push(filt);
                }
            }
            else {
                return;
            }
        });
        filtered = conditions;
        if (and.length > 0) {
            filtered[sequelize_1.Op.and] = and;
        }
        if (or.length > 0) {
            filtered[sequelize_1.Op.or] = or;
        }
        return filtered;
    }
    isNull(field, cols) {
        if (cols.includes(field)) {
            return {
                [field]: {
                    [sequelize_1.Op.eq]: null,
                },
            };
        }
        else {
            return {};
        }
    }
    notNull(field, cols) {
        if (cols.includes(field)) {
            return {
                [field]: {
                    [sequelize_1.Op.ne]: null,
                },
            };
        }
        else {
            return {};
        }
    }
    include(includes, model) {
        const associations = new model().getRelations();
        associations.push("creator", "updator");
        let inclusions = includes.split(",");
        inclusions = inclusions.filter((i) => associations.find((ass) => ass == i));
        inclusions.forEach((incl, key) => {
            if (incl.includes(".")) {
                inclusions[key] = this.recursiveInclude(incl.split("."), 0);
            }
        });
        return {
            distinct: "id",
            include: inclusions,
        };
    }
    recursiveInclude(incl, level) {
        if (level >= incl.length - 1)
            return { association: incl[level] };
        return {
            association: incl[level],
            include: this.recursiveInclude(incl, level + 1),
        };
    }
    order(cols, field, desc) {
        desc = desc?.toString().toLowerCase() == "true";
        if (cols.includes(field)) {
            if (Boolean(desc)) {
                return { order: [[field, "DESC"]] };
            }
            return { order: [field] };
        }
        return {};
    }
    withTrashed(paranoid) {
        return {
            paranoid: paranoid != "true" && paranoid != true,
        };
    }
    onlyTrashed(trashed) {
        if (trashed == true || trashed == "true") {
            return {
                deletedAt: {
                    [sequelize_1.Op.not]: null,
                },
            };
        }
        return {};
    }
    withScopes(scopes, modelScopes) {
        return scopes.split(",").filter((scope) => modelScopes.includes(scope));
    }
    getPaginationProps(page, perpage, result) {
        const lastPage = Math.ceil(result.count / perpage);
        return {
            ...result,
            lastPage,
            nextPage: page < lastPage ? Number(page) + 1 : null,
            prevPage: page > 1 ? Number(page) - 1 : null,
            currentPage: Number(page),
        };
    }
    getQuery(params, cols, model) {
        const fields = Object.keys(model.getAttributes());
        cols.push("createdAt");
        cols.push("updatedAt");
        cols.push("id");
        const query = {
            ...(params.page && params.perpage
                ? this.paginate(params.perpage, params.page)
                : {}),
            ...(params.include ? this.include(params.include, model) : {}),
            ...(params.limit ? this.limit(params.limit) : {}),
            ...(params.fields ? this.fields(params.fields, fields) : {}),
            ...(params.order ? this.order(cols, params.order, params.desc) : {}),
            ...(params.withtrashed ? this.withTrashed(params.withtrashed) : {}),
            ...(params.onlytrashed ? this.withTrashed(String(params.onlytrashed) == "true") : {}),
        };
        const like = params.like ? this.isLike(params.like, cols) : null;
        const filter = params.filter ? this.filter(params.filter, cols) : {};
        if (like) {
            filter[this.operators[like.union]] = [
                ...(filter[this.operators[like.union]] || []),
                like.condition,
            ];
        }
        const searchables = Object.entries(model.getAttributes())
            .filter(([key, value]) => {
            return !(value.type instanceof sequelize_1.DataTypes.DATE)
                && !(value.type instanceof sequelize_1.DataTypes.DATEONLY)
                && !(value.type instanceof sequelize_1.DataTypes.VIRTUAL);
        }).map(([key]) => key);
        query.where = {
            ...(params.search ? this.search(params.search, searchables) : {}),
            [sequelize_1.Op.and]: {
                ...(params.onlytrashed ? this.onlyTrashed(params.onlytrashed) : {}),
                ...filter,
                ...(params.isNull ? this.isNull(params.isNull, cols) : {}),
                ...(params.notNUll ? this.notNull(params.notNUll, cols) : {}),
            },
        };
        if (!params.limit && (!params.page || !params.perpage)) {
            query.limit = 1000;
        }
        return query;
    }
    async get(model, params) {
        const cols = new model().getSearchables();
        const args = this.getQuery(params, cols, model);
        model = this.loadScopes(model, params);
        return this.loadResults(model, params, args);
    }
    loadScopes(model, params) {
        const modelScopes = model.options.scopes;
        if (params.scopes && modelScopes) {
            const scopes = Object.keys(modelScopes);
            model = model.scope(this.withScopes(params.scopes, scopes));
        }
        return model;
    }
    async loadResults(model, params, args) {
        let result = [];
        const operationQuery = params.operation;
        const [operation, column] = operationQuery?.split(':') || [];
        const field = column ? column.split(',') : [];
        switch (operation) {
            case "sum":
                if (field.length == 1) {
                    result = await model.sum(column, args);
                }
                else {
                    for (const f of field) {
                        const data = await model.sum(f, args);
                        result.push(data);
                    }
                }
                break;
            case "max":
                if (field.length == 1) {
                    result = await model.max(column, args);
                }
                else {
                    for (const f of field) {
                        const data = await model.max(f, args);
                        result.push(data);
                    }
                }
                break;
            case "min":
                if (field.length == 1) {
                    result = await model.min(column, args);
                }
                else {
                    for (const f of field) {
                        const data = await model.min(f, args);
                        result.push(data);
                    }
                }
                break;
            case "count":
                result = await model.count(args);
                break;
            default:
                if (params.limit && params.limit == 1) {
                    result = await model.findOne(args);
                }
                else {
                    result = await model.findAndCountAll(args);
                }
                if (params.page && params.perpage && !params.limit) {
                    result = this.getPaginationProps(params.page, params.perpage, result);
                }
                break;
        }
        return result;
    }
}
exports.default = new Scope();
//# sourceMappingURL=scopes.js.map