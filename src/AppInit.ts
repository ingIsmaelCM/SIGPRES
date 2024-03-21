import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import config from "./app/app.config";
import http from "http";
import rateLimit from "express-rate-limit";
import SocketService from "@app/services/SocketService";
import AuthMiddleware from "@auth/middlewares/AuthMiddleware";
import initSwagger from "@/docs/jsdoc";
import helmet from "helmet"
import BaseRoutes from "@app/routes/BaseRoutes";
import AuthRoutes from "@auth/routes/AuthRoutes";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware"

export class App {
    public app: express.Application;
    public port: number;
    public server: http.Server;

    constructor(routes: Array<any>, port: number) {
        this.app = express();
        this.server = http.createServer(this.app);
        SocketService.createSocket(this.server)
        this.port = port;
        this.initApp();
        this.app.get("/api", (req, res) => {
            res.status(200).send(`El api está corriendo en el puerdo ${this.port}`);
        });
        this.initRoutes(routes);
    }

    private initApp() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.internationalize();
        this.app.use("/api/public", express.static("public"));
        this.app.use("/api/views", express.static("views"));
        initSwagger(this.app)
        this.secureApp();
        this.app.use(
            session({
                secret: config.auth.secret,
                resave: false,
                saveUninitialized: true,
            })
        );
        this.app.use(
            cors({
                origin: "*",
                credentials: true,
            })
        );
    }
    private internationalize() {
        i18next
            .use(Backend)
            .use(i18nextMiddleware.LanguageDetector)
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
        this.app.use(i18nextMiddleware.handle(i18next));

    }

    private secureApp() {
        this.app.use(rateLimit({
            limit: config.app.rateLimit,
            windowMs: config.app.rateTime,
            message: "Ha excedido el límite de solicitudes"
        }))
        this.app.use(helmet())
    }

    private initRoutes(routes: Array<BaseRoutes<any>>) {
        const authRoute = new AuthRoutes();
        this.app.use(`/api/${authRoute.controller.prefix}`, authRoute.router);
        this.app.use(AuthMiddleware.auth);
        routes.forEach((route) => {
            this.app.use(`/api/${route.controller.prefix}`, route.router);
        });
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`Ejecutando en el puerto ${this.port}`);
        });
    }
}
