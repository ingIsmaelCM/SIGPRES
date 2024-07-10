"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_config_1 = __importDefault(require("../app.config"));
const tools_1 = __importDefault(require("../utils/tools"));
class Seed {
    sequelize;
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async run(seeds) {
        await this.sequelize.query("SET foreign_key_checks = 0");
        for (const seed of seeds) {
            await this.runFromSeed(seed);
        }
        await this.sequelize.query("SET foreign_key_checks = 1");
        console.log("\x1b[34m%s\x1b[0m", "La inserción se ha completado con éxito.");
    }
    async runFromSeed(seed) {
        if (seed === "all") {
            const folderPath = path_1.default.join(__dirname, "seeds");
            const files = fs_1.default.readdirSync(folderPath);
            for (const file of files) {
                if (file.endsWith(".sql")) {
                    await tools_1.default.runSQLFile(path_1.default.join(folderPath, file), this.sequelize);
                }
            }
        }
        else {
            const filePath = path_1.default.join(__dirname, `seeds/${seed}.sql`);
            await tools_1.default.runSQLFile(filePath, this.sequelize);
        }
    }
}
const sequelize = new sequelize_1.Sequelize(app_config_1.default.db.database, app_config_1.default.db.user, app_config_1.default.db.password, {
    dialect: app_config_1.default.db.dialect,
    host: app_config_1.default.db.host,
    logging: app_config_1.default.db.logging,
    timezone: "-04:00",
});
const runner = new Seed(sequelize);
runner.run(process.argv.slice(2)).then(() => console.log("Finished"));
//# sourceMappingURL=Seed.js.map