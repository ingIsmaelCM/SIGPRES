"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class ImageRequest extends BaseRequest_1.default {
    imageSingleCreateRequest() {
        return [
            ...this.requireIdRequest(),
        ];
    }
    imageSBulkCreateRequest() {
        return [
            ...this.requireIdRequest(),
        ];
    }
    imageUpdateRequest() {
        return [];
    }
}
exports.default = new ImageRequest();
//# sourceMappingURL=ImageRequest.js.map