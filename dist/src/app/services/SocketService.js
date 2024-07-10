"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    static socket;
    constructor() {
    }
    static createSocket(server) {
        if (!SocketService.socket) {
            SocketService.socket = new socket_io_1.Server(server, {
                cors: {
                    origin: "*",
                },
                path: "/api/socket",
            });
            SocketService.setMiddelware();
            SocketService.socketListen();
        }
    }
    static setMiddelware() {
        this.socket.use((socket, next) => {
            next();
        });
    }
    static socketListen() {
        try {
            this.socket.on("connection", (socket) => {
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    emit(channel, content) {
        SocketService.socket.timeout(5000).emit(channel, content);
    }
}
exports.default = SocketService;
//# sourceMappingURL=SocketService.js.map