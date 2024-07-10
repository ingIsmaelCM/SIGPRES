"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EGuaranteeStatus = exports.EAttributeType = exports.EMoraStatus = exports.ELoanStatus = exports.ELoanPeriod = exports.ELoanType = exports.ELawyerPaymode = exports.ELawyerPaymentStatus = exports.EJobStatus = exports.EInfoGender = exports.EInfoModels = exports.EClientContactRelationship = exports.EClientType = exports.EAmortizationStatus = void 0;
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
var ELoanType;
(function (ELoanType) {
    ELoanType["Fixed"] = "Tasa Fija";
    ELoanType["Variable"] = "Tasa Variable";
})(ELoanType || (exports.ELoanType = ELoanType = {}));
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
    ELoanStatus["Pagado"] = "Pagado";
})(ELoanStatus || (exports.ELoanStatus = ELoanStatus = {}));
var EMoraStatus;
(function (EMoraStatus) {
    EMoraStatus["Cobrada"] = "Cobrada";
    EMoraStatus["Perdonada"] = "Perdonada";
})(EMoraStatus || (exports.EMoraStatus = EMoraStatus = {}));
var EAttributeType;
(function (EAttributeType) {
    EAttributeType["bool"] = "Booleano";
    EAttributeType["string"] = "Texto";
    EAttributeType["numeric"] = "Num\u00E9rico";
    EAttributeType["options"] = "Opciones";
})(EAttributeType || (exports.EAttributeType = EAttributeType = {}));
var EGuaranteeStatus;
(function (EGuaranteeStatus) {
    EGuaranteeStatus["Retenido"] = "Retenido";
    EGuaranteeStatus["Financiado"] = "Financiado";
    EGuaranteeStatus["Incautado"] = "Incautado";
    EGuaranteeStatus["Documentado"] = "Documentado";
    EGuaranteeStatus["Recuperado"] = "Recuperado";
    EGuaranteeStatus["Saldado"] = "Saldado";
})(EGuaranteeStatus || (exports.EGuaranteeStatus = EGuaranteeStatus = {}));
//# sourceMappingURL=SourceInterfaces.js.map