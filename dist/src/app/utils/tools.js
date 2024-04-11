"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../app.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
require("moment/locale/es");
const fs_1 = __importDefault(require("fs"));
class Tool {
    parseOrZero(value) {
        if (typeof value == "number") {
            return value;
        }
        const converted = Number(value);
        if (isNaN(converted)) {
            return 0;
        }
        return converted;
    }
    async runSQLFile(filePath, sequelize) {
        const sql = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
        const queries = sql.split(/;\s*$/m);
        let runned = 0;
        console.log("\x1b[33m%s\x1b[0m", `Ejecutando consultas de ${filePath.split("db")[1]}`);
        for (const query of queries) {
            if (query.length > 0) {
                try {
                    runned++;
                    console.log("\x1b[32m%s\x1b[0m", `Ejecutando consulta ${runned} de ${queries.length}`);
                    await sequelize.query(query);
                }
                catch (error) {
                    console.error("\x1b[31m%s\x1b[0m", `Error ejecutando la consulta: ${query}`);
                    throw error;
                }
            }
        }
        console.log("\x1b[34m%s\x1b[0m", `Se ejecutaron las consultas de ${filePath.split("db")[1]}`);
    }
    setCookie(res, name, value, expiration) {
        res.cookie(name, value, {
            httpOnly: true,
            sameSite: false,
            secure: true,
            expires: new Date(Date.now() + (expiration || 24 * 60 * 60 * 1000)),
        });
    }
    getCookies(req) {
        const cookies = req.headers["cookie"];
        if (!cookies)
            return null;
        return Object.fromEntries(cookies.split("; ").map((cookie) => {
            const [name, value] = cookie.split("=");
            return [name, decodeURIComponent(value)];
        }));
    }
    getToken(payload, expiresIn) {
        return jsonwebtoken_1.default.sign(payload, app_config_1.default.auth.secret, {
            expiresIn,
        });
    }
    dateToHuman(date) {
        return (0, moment_1.default)(date).locale("es").format("DD MMM YYYY, hh:mm:ss A");
    }
    diffDates(start, end) {
        start = (0, moment_1.default)(start);
        end = (0, moment_1.default)(end);
        return Math.round(moment_1.default.duration(end.diff(start)).asHours() * 100) / 100;
    }
    uppercaseFirst(str) {
        return `${str[0].toUpperCase()}${str.substring(1)}`;
    }
    initialToUpper = (sentence = "") => sentence.toLocaleLowerCase().replace(/\b[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+\b/gi, (match) => match.toLowerCase().replace(match.charAt(0), match.charAt(0).toUpperCase()));
    setUserRelated(req, data) {
        if (!data.id) {
            data.createdBy = req.auth.id;
        }
        data.updatedBy = req.auth.id;
        return data;
    }
    fromEnum(myEnum) {
        const arr = Object.values(myEnum);
        return arr.slice(0, arr.length / 2);
    }
}
exports.default = new Tool();
//# sourceMappingURL=tools.js.map