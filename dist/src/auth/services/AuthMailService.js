"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailService_1 = __importDefault(require("@app/services/MailService"));
class AuthMailService {
    mailService = MailService_1.default.getMailInstance();
    async sendEmail(options) {
        return await this.mailService
            .to(options.to)
            .subject(options.subject)
            .context(options.context)
            .template(options.template)
            .attachment(options.attachment || [])
            .send();
    }
}
exports.default = AuthMailService;
//# sourceMappingURL=AuthMailService.js.map