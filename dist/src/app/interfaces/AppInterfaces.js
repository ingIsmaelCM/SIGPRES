"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStatusCode = void 0;
var EStatusCode;
(function (EStatusCode) {
    EStatusCode[EStatusCode["OK"] = 200] = "OK";
    EStatusCode[EStatusCode["Creado"] = 201] = "Creado";
    EStatusCode[EStatusCode["NoAutorizado"] = 401] = "NoAutorizado";
    EStatusCode[EStatusCode["Prohibido"] = 403] = "Prohibido";
    EStatusCode[EStatusCode["NoEncontrado"] = 404] = "NoEncontrado";
    EStatusCode[EStatusCode["EntidadNoProcesable"] = 422] = "EntidadNoProcesable";
    EStatusCode[EStatusCode["ErrorInterno"] = 500] = "ErrorInterno";
})(EStatusCode || (exports.EStatusCode = EStatusCode = {}));
//# sourceMappingURL=AppInterfaces.js.map