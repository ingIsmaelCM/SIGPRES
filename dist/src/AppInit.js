"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const app_config_1 = __importDefault(require("./app/app.config"));
const http_1 = __importDefault(require("http"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const SocketService_1 = __importDefault(require("@app/services/SocketService"));
const AuthMiddleware_1 = __importDefault(require("@auth/middlewares/AuthMiddleware"));
const jsdoc_1 = __importDefault(require("@/docs/jsdoc"));
const helmet_1 = __importDefault(require("helmet"));
const AuthRoutes_1 = __importDefault(require("@auth/routes/AuthRoutes"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const Multer_1 = __importDefault(require("@app/middlewares/Multer"));
const IdempotencyMiddleware_1 = __importDefault(require("@app/middlewares/IdempotencyMiddleware"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
class App {
    app;
    port;
    server;
    constructor(routes, port) {
        this.app = (0, express_1.default)();
        this.app.use('/proxy', (0, express_http_proxy_1.default)(app_config_1.default.app.url));
        this.server = http_1.default.createServer(this.app);
        SocketService_1.default.createSocket(this.server);
        this.port = port;
        this.initApp();
        this.app.get("/api", (req, res) => {
            res.status(200).send(`El api está corriendo en el puerto ${this.port}`);
        });
        this.initRoutes(routes);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Ejecutando en el puerto ${this.port}`);
        });
    }
    initApp() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(new Multer_1.default().config());
        this.internationalize();
        this.app.use("/api/public", express_1.default.static("public"));
        this.app.use("/api/views", express_1.default.static("views"));
        (0, jsdoc_1.default)(this.app);
        this.secureApp();
    }
    internationalize() {
        i18next_1.default
            .use(i18next_fs_backend_1.default)
            .use(i18next_http_middleware_1.default.LanguageDetector)
            .init({
            debug: false,
            detection: {
                order: ['querystring', 'cookie'],
                caches: ['cookie']
            },
            backend: {
                loadPath: __dirname + '/app/utils/locale/{{lng}}.json'
            },
            fallbackLng: 'es',
            preload: ['es', 'en'],
            saveMissing: true,
        });
        this.app.use(i18next_http_middleware_1.default.handle(i18next_1.default));
    }
    secureApp() {
        this.app.use((0, express_rate_limit_1.default)({
            limit: app_config_1.default.app.rateLimit,
            windowMs: app_config_1.default.app.rateTime,
            message: "Ha excedido el límite de solicitudes"
        }));
        this.app.use((0, express_session_1.default)({
            secret: app_config_1.default.auth.secret,
            resave: false,
            saveUninitialized: true,
        }));
        this.app.use((0, cors_1.default)({
            origin: app_config_1.default.app.allowedUrl,
            credentials: true,
        }));
        this.app.use((0, helmet_1.default)());
    }
    initRoutes(routes) {
        const authRoute = new AuthRoutes_1.default();
        this.app.use(`/api/${authRoute.controller.prefix}`, authRoute.router);
        this.app.post('*', (req, res, next) => IdempotencyMiddleware_1.default.idempotent(req, res, next));
        this.app.use(AuthMiddleware_1.default.auth);
        routes.forEach((route) => {
            this.app.use(`/api/${route.controller.prefix}`, route.router);
        });
    }
}
exports.App = App;
//# sourceMappingURL=AppInit.js.map