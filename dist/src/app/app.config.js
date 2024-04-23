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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const process = __importStar(require("process"));
const braintree_1 = require("braintree");
dotenv_1.default.config();
const env = process.env.NODE_ENV || "prod";
let config = {
    app: {
        port: env != "test" ? process.env.PORT : process.env.PORT_TEST,
        name: process.env.APP_NAME || "Faciloans",
        url: process.env.APP_URL || "http://localhost",
        public: path_1.default.resolve(__dirname, "../../public"),
        views: path_1.default.resolve(__dirname, "../../views"),
        env,
        allowedUrl: process.env.ALLOWED_URL,
        rateLimit: process.env.REQUEST_RATE_LIMIT || 1500,
        rateTime: process.env.REQUEST_RATE_TIME || (30 * 60 * 10000)
    },
    db: {
        database: process.env.DATABASE_NAME || "any",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "",
        host: process.env.DATABASE_HOST || "localhost",
        dialect: process.env.DATABASE_DIALECT || "mysql",
        logging: process.env.DATABSE_LOGGIN == "TRUE",
        timezone: "-04:00",
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === "TRUE",
        from: process.env.MAIL_FROM,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASSWORD,
        },
        tls: {
            rejectUnauthorized: process.env.MAIL_TLS_REJECT === "TRUE",
        },
    },
    auth: {
        secret: process.env.PRIVATE_KEY || "<PRIVATE_KEY>",
        expiresIn: process.env.EXPIRES_IN || '1h',
        loginField: process.env.AUTH_LOGIN_FIELD || "email",
    },
    test: {
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
        name: process.env.TEST_NAME,
        lastname: process.env.TEST_LASTNAME,
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        upload_preset: process.env.CLOUD_UPLOAD_PRESET
    },
    company: {
        name: process.env.COMPANY_NAME || "No Company Name",
        longName: process.env.COMPANY_LONG_NAME || "No Company Long Name",
        address: process.env.COMPANY_ADDRESS || "No Company Address",
        phone: process.env.COMPANY_PHONE || "No Company Phone",
        email: process.env.COMPANY_EMAIL || "No Company Email",
        logo: process.env.COMPANY_LOGO || "No Company Logo",
        rnc: process.env.COMPANY_RNC || "No Company RNC",
    },
    stripe: {
        key: process.env.STRIPE_KEY
    },
    braintree: {
        environment: process.env.BRAINTREE_ENVIRONMENT == 'sandbox' ? braintree_1.Environment.Sandbox : braintree_1.Environment.Production,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    }
};
exports.default = config;
//# sourceMappingURL=app.config.js.map