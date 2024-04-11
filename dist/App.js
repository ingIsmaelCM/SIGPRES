"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_config_1 = __importDefault(require("@app/app.config"));
const AppInit_1 = require("@/AppInit");
const Relations_1 = __importDefault(require("@app/models/Relations"));
const response_1 = __importDefault(require("@app/utils/response"));
const routes_1 = __importDefault(require("@source/routes"));
const routes_2 = __importDefault(require("@auth/routes"));
const PORT = app_config_1.default.app.port;
const routes = [
    ...routes_1.default,
    ...routes_2.default
];
const app = new AppInit_1.App(routes, PORT);
Relations_1.default.initRelations();
app.app.use("/api/*", (req, res) => {
    process.env.TZ = 'America/Santo_Domingo';
    response_1.default.error(res, 404, "Not Found");
});
app.listen();
exports.default = app;
//# sourceMappingURL=App.js.map