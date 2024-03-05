import { IAuth } from "@/auth/utils/AuthInterfaces";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export default class SocketService {
  socket: Server;

  constructor(server: HttpServer) {
    this.socket = new Server(server, {
      cors: {
        origin: "*",
      },
      path: "/api/socket",
    });
    this.setMiddelware();
    this.sockectListen();
  }

  private setMiddelware() {
    this.socket.use((socket, next) => {
      next();
    });
  }

  private sockectListen() {
    try {
      this.socket.on("connection", (socket: any) => {
        socket.on("message", (socket: any) => {
          const auth: IAuth = socket.auth;
          const sender = {
            name: auth.name + " " + auth.lastname,
            email: auth.email,
            username: auth.username,
            lastlogin: auth.lastlogin,
          };
          this.socket.emit("message", { ...socket, sender, auth: undefined });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

}
