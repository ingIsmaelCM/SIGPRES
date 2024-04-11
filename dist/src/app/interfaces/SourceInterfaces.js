"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMoraStatus = exports.ELoanStatus = exports.ELoanPeriod = exports.ELawyerPaymode = exports.ELawyerPaymentStatus = exports.EJobStatus = exports.EInfoGender = exports.EInfoModels = exports.EClientContactRelationship = exports.EClientType = exports.EAmortizationStatus = void 0;
var EAmortizationStatus;
(function (EAmortizationStatus) {
    EAmortizationStatus["Pendiente"] = "Pendiente";
    EAmortizationStatus["Pagado"] = "Pagado";
    EAmortizationStatus["Cancelado"] = "Cancelado";
})(EAmortizationStatus || (exports.EAmortizationStatus = EAmortizationStatus = {}));
var EClientType;
(function (EClientType) {
    EClientType["Persona"] = "Persona";
    EClientType["Negocio"] = "Negocio";
})(EClientType || (exports.EClientType = EClientType = {}));
var EClientContactRelationship;
(function (EClientContactRelationship) {
    EClientContactRelationship["Conyuge"] = "Conyuge";
    EClientContactRelationship["Familiar"] = "Familiar";
    EClientContactRelationship["Amigo"] = "Amigo";
    EClientContactRelationship["Conocido"] = "Conocido";
    EClientContactRelationship["Otro"] = "Otro";
})(EClientContactRelationship || (exports.EClientContactRelationship = EClientContactRelationship = {}));
var EInfoModels;
(function (EInfoModels) {
    EInfoModels["Client"] = "Client";
    EInfoModels["Lawyer"] = "Lawyer";
    EInfoModels["Contact"] = "Contact";
    EInfoModels["Job"] = "Job";
})(EInfoModels || (exports.EInfoModels = EInfoModels = {}));
var EInfoGender;
(function (EInfoGender) {
    EInfoGender["Masculino"] = "Masculino";
    EInfoGender["Femenino"] = "Femenino";
    EInfoGender["Ninguno"] = "Ninguno";
})(EInfoGender || (exports.EInfoGender = EInfoGender = {}));
var EJobStatus;
(function (EJobStatus) {
    EJobStatus["Actual"] = "Actual";
    EJobStatus["Anterior"] = "Anterior";
})(EJobStatus || (exports.EJobStatus = EJobStatus = {}));
var ELawyerPaymentStatus;
(function (ELawyerPaymentStatus) {
    ELawyerPaymentStatus["Pendiente"] = "Pendiente";
    ELawyerPaymentStatus["Pagado"] = "Pagado";
    ELawyerPaymentStatus["Cancelado"] = "Cancelado";
})(ELawyerPaymentStatus || (exports.ELawyerPaymentStatus = ELawyerPaymentStatus = {}));
var ELawyerPaymode;
(function (ELawyerPaymode) {
    ELawyerPaymode["Mensual"] = "Mensual";
    ELawyerPaymode["Porcentaje"] = "Porcentaje de Cobro";
    ELawyerPaymode["Cuota"] = "Cuota de Cobro";
    ELawyerPaymode["Contrato"] = "Por Contrato";
})(ELawyerPaymode || (exports.ELawyerPaymode = ELawyerPaymode = {}));
var ELoanPeriod;
(function (ELoanPeriod) {
    ELoanPeriod["Diario"] = "diario";
    ELoanPeriod["Semanal"] = "semanal";
    ELoanPeriod["Quincenal"] = "quincenal";
    ELoanPeriod["Mensual"] = "mensual";
})(ELoanPeriod || (exports.ELoanPeriod = ELoanPeriod = {}));
var ELoanStatus;
(function (ELoanStatus) {
    ELoanStatus["Pendiente"] = "Pendiente";
    ELoanStatus["Aprobado"] = "Aprobado";
    ELoanStatus["Rechazado"] = "Rechazado";
})(ELoanStatus || (exports.ELoanStatus = ELoanStatus = {}));
var EMoraStatus;
(function (EMoraStatus) {
    EMoraStatus["Cobrada"] = "Cobrada";
    EMoraStatus["Perdonada"] = "Perdonada";
})(EMoraStatus || (exports.EMoraStatus = EMoraStatus = {}));
//# sourceMappingURL=SourceInterfaces.js.map