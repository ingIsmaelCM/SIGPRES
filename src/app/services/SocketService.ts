import {IAuth} from "@app/interfaces/AuthInterfaces";
import {Server as HttpServer} from "http";
import {RemoteSocket, Server} from "socket.io";

export default class SocketService {
    private static socket: Server;

    constructor() {
    }

    static createSocket(server: HttpServer) {
        if (!SocketService.socket) {
            SocketService.socket = new Server(server, {
                cors: {
                    origin: "*",
                },
                path: "/api/socket",
            });
            SocketService.setMiddelware();
            SocketService.sockectListen();
        }

    }
    private static setMiddelware() {
        this.socket.use((socket, next) => {
            next();
        });
    }

    private static sockectListen() {
        try {
            this.socket.on("connection", (socket: any) => {

            });
        } catch (error) {
            console.log(error);
        }
    }

     emit(channel: string, content: any) {
       SocketService.socket.timeout(5000).emit(channel, content)
    }

}
