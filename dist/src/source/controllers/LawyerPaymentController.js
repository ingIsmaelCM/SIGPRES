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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importStar(require("@/app/controllers/Controller"));
const LawyerPaymentService_1 = __importDefault(require("@source/services/LawyerPaymentService"));
class LawyerPaymentController extends Controller_1.default {
    prefix = 'lawyerPayments';
    mainService = new LawyerPaymentService_1.default();
    async index(req, res) {
        return this.safeRun(async () => this.mainService.getLawyerPayments(req.query), res, 200, "Lista de pagos a abogados");
    }
    async show(req, res) {
        return this.safeRun(async () => this.mainService.findLawyerPayment(req.params.id, req.query), res, 200, "Detalles del pago");
    }
    async store(req, res) {
        return this.safeRun(async () => this.mainService.createLawyerPayment(req.body), res, 201, "");
    }
    async update(req, res) {
        return this.safeRun(async () => this.mainService.updateLawyerPayment(req.params.id, req.body), res, 201, "");
    }
    async delete(req, res) {
        return this.safeRun(async () => this.mainService.deleteLawyerPayment(req.params.id), res, 200, "");
    }
    async restore(req, res) {
        return this.safeRun(async () => this.mainService.restoreLawyerPayment(req.params.id), res, 200, "");
    }
}
exports.default = LawyerPaymentController;
__decorate([
    Controller_1.setAuthor,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LawyerPaymentController.prototype, "store", null);
__decorate([
    Controller_1.setAuthor,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LawyerPaymentController.prototype, "update", null);
//# sourceMappingURL=LawyerPaymentController.js.map