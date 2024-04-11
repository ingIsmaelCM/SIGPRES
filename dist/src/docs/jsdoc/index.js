"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'SIGPRES',
            version: '1.0.0',
            description: 'Sistema Integrado para la Gestión de Préstamos',
        },
        host: 'localhost:3001',
        basePath: '/api',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
                bearerAuth: []
            }]
    },
    apis: ['src/source/routes/*.ts', 'src/docs/v1/schemas/const.yaml'],
};
const initSwagger = (app) => {
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swaggerOptions)));
};
exports.default = initSwagger;
//# sourceMappingURL=index.js.map