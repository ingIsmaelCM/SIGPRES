"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonAttributes = exports.staticImplements = void 0;
const sequelize_1 = require("sequelize");
function staticImplements() {
    return (_constructor) => {
    };
}
exports.staticImplements = staticImplements;
exports.commonAttributes = {
    id: {
        type: sequelize_1.DataTypes.STRING(70),
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
};
const ITM = { staticImplements, commonAttributes: exports.commonAttributes };
exports.default = ITM;
//# sourceMappingURL=ITenantModel.js.map