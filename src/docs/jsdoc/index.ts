import {Application} from "express"
import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc"

//BUG Problem with schemas on jsdoc
const swaggerOptions: swaggerJSDOC.Options = {
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

const initSwagger=(app: Application)=>{
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDOC(swaggerOptions)));
}
export default initSwagger
