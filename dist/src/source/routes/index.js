"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AmortizationRoute_1 = __importDefault(require("@source/routes/AmortizationRoute"));
const ClientRoute_1 = __importDefault(require("@source/routes/ClientRoute"));
const ConditionRoute_1 = __importDefault(require("@source/routes/ConditionRoute"));
const ContactRoute_1 = __importDefault(require("@source/routes/ContactRoute"));
const DocumentRoute_1 = __importDefault(require("@source/routes/DocumentRoute"));
const ExpenseRoute_1 = __importDefault(require("@source/routes/ExpenseRoute"));
const ImageRoute_1 = __importDefault(require("@source/routes/ImageRoute"));
const InfoRoute_1 = __importDefault(require("@source/routes/InfoRoute"));
const JobRoute_1 = __importDefault(require("@source/routes/JobRoute"));
const LawyerRoute_1 = __importDefault(require("@source/routes/LawyerRoute"));
const LoanRoute_1 = __importDefault(require("@source/routes/LoanRoute"));
const MoraRoute_1 = __importDefault(require("@source/routes/MoraRoute"));
const PaymentRoute_1 = __importDefault(require("@source/routes/PaymentRoute"));
const SocialRoute_1 = __importDefault(require("@source/routes/SocialRoute"));
const WalletRoute_1 = __importDefault(require("@source/routes/WalletRoute"));
const ClientContactRoute_1 = __importDefault(require("@source/routes/ClientContactRoute"));
const PreferenceRoute_1 = __importDefault(require("@source/routes/PreferenceRoute"));
const LawyerPaymentRoute_1 = __importDefault(require("@source/routes/LawyerPaymentRoute"));
const WhatsappRoute_1 = __importDefault(require("@source/routes/WhatsappRoute"));
const CardRoute_1 = __importDefault(require("@source/routes/CardRoute"));
const sourceRoutes = [
    new PreferenceRoute_1.default(),
    new AmortizationRoute_1.default(),
    new ClientRoute_1.default(),
    new ConditionRoute_1.default(),
    new ContactRoute_1.default(),
    new DocumentRoute_1.default(),
    new ExpenseRoute_1.default(),
    new ImageRoute_1.default(),
    new InfoRoute_1.default(),
    new JobRoute_1.default(),
    new LawyerRoute_1.default(),
    new LoanRoute_1.default(),
    new MoraRoute_1.default(),
    new PaymentRoute_1.default(),
    new SocialRoute_1.default(),
    new WalletRoute_1.default(),
    new ClientContactRoute_1.default(),
    new LawyerPaymentRoute_1.default(),
    new WhatsappRoute_1.default(),
    new CardRoute_1.default(),
];
exports.default = sourceRoutes;
//# sourceMappingURL=index.js.map