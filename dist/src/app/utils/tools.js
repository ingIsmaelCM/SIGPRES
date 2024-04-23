"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../app.config"));
const app_config_2 = __importDefault(require("../app.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
require("moment/locale/es");
const fs_1 = __importDefault(require("fs"));
const crypto = __importStar(require("crypto"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class Tool {
    async decrypt(encrypted, secretKey, ivArray) {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        const keyHash = crypto.createHash('sha256').update(keyData).digest();
        const decipher = crypto.createDecipheriv('aes-256-cbc', keyHash, Buffer.from(ivArray));
        let decrypted = decipher.update(Buffer.from(encrypted));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    }
    async decryptCard(token) {
        const storedReq = TenantConnection_1.default.requestNamespace.get('req');
        const tenant = storedReq.cookies.tenant;
        let encrypted = jsonwebtoken_1.default.verify(String(token), app_config_2.default.auth.secret);
        encrypted = JSON.parse(encrypted.value);
        const decrypted = await this.decrypt(encrypted.encrypted, tenant, encrypted.iv);
        return JSON.parse(decrypted);
    }
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
    initialToUpper = (sentence = "") => sentence.replace(/\b[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+\b/gi, (match) => match !== match.toUpperCase() ? this.uppercaseFirst(match) : match);
    setUserRelated(req, data) {
        if (!data.id) {
            data.createdBy = req.auth.username;
        }
        data.updatedBy = req.auth.username;
        return data;
    }
    fromEnum(myEnum) {
        const arr = Object.values(myEnum);
        return arr.slice(0, arr.length / 2);
    }
}
exports.default = new Tool();
//# sourceMappingURL=tools.js.map