import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import LawyerRepository from "@source/repositories/LawyerRepository";
import {ELawyerPaymode} from "@app/interfaces/SourceInterfaces";

class LawyerRequest extends BaseRequest {
    lawyerRepo = new LawyerRepository();

    lawyerCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name", 0, 50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.required("payMode"),
            this.RequestCheck.isIn("payMode", "", Object.values(ELawyerPaymode)),
            this.RequestCheck.required("payPrice"),
            this.RequestCheck.isFloat("payPrice"),
            this.RequestCheck.isLength("lastname", 0, 50),
            this.RequestCheck.isLength("exequatur", 2, 20).optional({values: "falsy"}),
            body("exequatur", "Este exequátur ya está registrado")
                .custom((value: string) =>
                    this.checkUnique("exequatur", value))
                .optional({values: "falsy"})
        ]
    }

    lawyerUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isLength("name", 0, 50).optional(),
            this.RequestCheck.isLength("lastname", 0, 50).optional(),
            this.RequestCheck.isIn("payMode", "", Object.values(ELawyerPaymode)).optional(),
            this.RequestCheck.isFloat("payPrice").optional(),
            this.RequestCheck.isLength("exequatur", 2, 20).optional({values: "falsy"}),
            this.RequestCheck.isString("infoId").optional(),
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