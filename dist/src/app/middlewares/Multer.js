"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = require("crypto");
class Multer {
    fileStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },
        filename: (req, file, cb) => {
            cb(null, (0, crypto_1.randomBytes)(4).toString("hex") + "-" + file.originalname);
        },
    });
    fileFilter = (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/svg" ||
            file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    config = () => (0, multer_1.default)({ storage: this.fileStorage, fileFilter: this.fileFilter }).any();
}
exports.default = Multer;
//# sourceMappingURL=Multer.js.map