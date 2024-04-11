"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_config_1 = __importDefault(require("@app/app.config"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
class MailService {
    transporter;
    static instance;
    email = { to: "" };
    constructor() {
        this.transporter = nodemailer_1.default.createTransport(app_config_1.default.mail);
        this.initTemplate();
    }
    to(toEmail) {
        this.email.to = toEmail;
        return this;
    }
    subject(subject) {
        this.email.subject = subject;
        return this;
    }
    template(template) {
        this.email.template = template;
        return this;
    }
    context(context) {
        this.email.context = context;
        return this;
    }
    attachment(attachment) {
        this.email.attachment = attachment;
        return this;
    }
    clearEmail() {
        this.email = {
            to: "",
        };
    }
    static getMailInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    initTemplate() {
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                extname: ".hbs",
                partialsDir: path_1.default.join(app_config_1.default.app.views, "templates"),
                layoutsDir: path_1.default.join(app_config_1.default.app.views, "layouts"),
                defaultLayout: "",
            },
            viewPath: path_1.default.join(app_config_1.default.app.views, "templates"),
            extName: ".hbs",
        }));
    }
    async send() {
        return new Promise((resolve, reject) => {
            this.email.from = app_config_1.default.mail.from;
            this.transporter.sendMail(this.email, (err, info) => {
                if (err) {
                    this.clearEmail();
                    reject(err);
                }
                this.clearEmail();
                resolve(info);
            });
        });
    }
}
exports.default = MailService;
//# sourceMappingURL=MailService.js.map