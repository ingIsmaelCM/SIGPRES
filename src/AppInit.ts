import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import IController from "@app/controllers/IController";
import session from "express-session";
import config from "./app/app.config";
import http from "http";
import SocketService from "./app/services/SocketService";

export class App {
  public app: express.Application;
  public port: number;
  public server: http.Server;
  constructor(controllers: Array<any>, port: number) {
    this.app = express();
    this.server = http.createServer(this.app);
    new SocketService(this.server);
    this.port = port;
    this.initApp();
    this.app.get("/api", (req, res) => {
      res.status(200).send(`El api está corriendo en el puerdo ${this.port}`);
    });
    this.initControllers(controllers);
  }

  private initApp() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use("/api/public", express.static("public"));
    this.app.use("/api/views", express.static("views"));
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
  private initControllers(controllers: Array<IController>) {
    controllers.forEach((controller: IController) => {
      this.app.use(`/api/${controller.prefix}`, controller.router);
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Ejecutando en el puerto ${this.port}`);
    });
  }
}
