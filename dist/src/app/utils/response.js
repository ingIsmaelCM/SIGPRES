"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    success(res, status, body, title) {
        status = isNaN(Number(status)) ? 200 : Number(status);
        res.status(status).json({
            statusCode: status,
            title: title,
            content: body,
        });
    },
    error(res, status, error, title) {
        status = isNaN(Number(status)) ? 500 : Number(status);
        res.status(status || 500).json({
            title: title,
            statusCode: status || 500,
            content: error,
        });
    },
};
//# sourceMappingURL=response.js.map