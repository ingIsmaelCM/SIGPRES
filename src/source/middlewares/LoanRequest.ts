import BaseRequest from "@/app/middlewares/BaseRequest";
import {ValidationChain, body} from "express-validator";
import {ELoanPeriod} from "../utils/SourceInterfaces";

class LoanRequest extends BaseRequest {
    createLoanRequest(): Array<ValidationChain> {
        return [
            body("amount", "Ingrese un monto").exists().notEmpty(),
            body("amount", "El monto debe ser un valor válido").isNumeric(),
            body("amount", "El monto debe ser mayor a 0").isLength({min: 1}),
            body("startAt", "Ingrese una fecha de inicio").exists().notEmpty(),
            body("startAt", "Ingrese una fecha válida").isISO8601().toDate(),
            body("term", "Ingrese un número de cuotas").exists().notEmpty(),
            body("term", "Las cuotas deben ser un valor válido").isInt({min: 1}),
            body("period", "Ingrese un periodo de pagos").exists().notEmpty(),
            body("period", "El periodo de cuota debe ser un valor válido").custom(
                (value: any) => {
                    return (
                        !isNaN(parseInt(value)) ||
                        Object.values(ELoanPeriod).includes(value.toLowerCase())
                    );
                }
            ),
            body("clientId", "Indique un cliente asociado").exists().notEmpty(),
            body("clientId", "El cliente asociado no es válido").isInt({min: 1}),
            body("walletId", "Indique una billetera asociada").exists().notEmpty(),
            body("walletId", "La billetera asociada no es válida").isInt({min: 1}),
        ];
    }
}

export default new LoanRequest();
