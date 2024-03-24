import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import LawyerRepository from "@source/repositories/LawyerRepository";

class LawyerRequest extends BaseRequest {
    lawyerRepo = new LawyerRepository();
    lawyerCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("name"),
            this.RequestMessage.isLength("name", 0, 50),
            this.RequestMessage.required("lastname"),
            this.RequestMessage.isLength("lastname", 0, 50),
            this.RequestMessage.isLength("exequatur", 2, 20).optional({values: "falsy"}),
            body("exequatur", "Este exequátur ya está registrado")
                .custom((value: string) =>
                    this.checkUnique("exequatur", value))
                .optional({values: "falsy"})
        ]
    }

    lawyerUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isLength("name", 0, 50).optional(),
            this.RequestMessage.isLength("lastname", 0, 50).optional(),
            this.RequestMessage.isLength("exequatur", 2, 20).optional({values: "falsy"}),
            this.RequestMessage.isInt("infoId").optional(),
            body("exequatur", "Este exequátur ya está registrado")
                .custom((value: string, meta: any) =>
                    this.checkUnique("exequatur", value, meta.req.params))
                .optional({values: "falsy"})
        ]
    }

    private async checkUnique(field: string, value: string, params?: { id: any }) {
        const existingLawyer = await this.lawyerRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${params?.id || 0}:and`,
            ],
            limit: 1
        });
        if (existingLawyer) return Promise.reject(false);
        return Promise.resolve(true);
    }
}

export default new LawyerRequest();