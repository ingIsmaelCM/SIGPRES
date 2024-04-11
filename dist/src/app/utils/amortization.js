"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.default = {
    getAmortization(data) {
        const { amount, term, rate, startAt, period } = data;
        let balance = Number(amount);
        const cuota = this.getCuota(amount, term, rate);
        const amortization = [];
        let payDate = startAt;
        let isFirst = true;
        for (let i = 0; i < term; i++) {
            const interest = (Number(balance) * Number(rate)) / 100;
            const capital = cuota - interest;
            balance -= capital;
            payDate = this.getDateCuota(payDate, period, isFirst);
            isFirst = false;
            amortization.push({
                nro: i + 1,
                date: payDate.format("YYYY-MM-DD 12:00:00"),
                cuota: Number(cuota.toFixed(2)),
                capital: Number(capital.toFixed(2)),
                interest: Number(interest.toFixed(2)),
                balance: Number(balance.toFixed(2)),
            });
        }
        return amortization;
    },
    getCuota(amount, term, rate) {
        if (rate > 0) {
            const rateIndex = Number(rate) / 100;
            return (amount * rateIndex) / ((1 - Math.pow(1 + rateIndex, -term)));
        }
        return amount / term;
    },
    getCantidadCuotas(amount, rate, cuota) {
        if (rate > 0) {
            const rateIndex = rate / 100;
            return -Math.log(1 - (amount * rateIndex) / cuota) / Math.log(1 + rateIndex);
        }
        return amount / cuota;
    },
    getDateCuota(startAt, period, isFirst = false) {
        let date = (0, moment_1.default)(startAt);
        period = typeof period == "string" ? period : String(period);
        const quincena = (0, moment_1.default)(date).date(15);
        const endOfMonth = (0, moment_1.default)(date).endOf("month");
        const endOfMonthNumber = Number((0, moment_1.default)(endOfMonth).format("DD"));
        const day = Number((0, moment_1.default)(date).format("DD"));
        switch (period.toLowerCase()) {
            case "diario":
                date = isFirst ? date : date.add(1, "day");
                break;
            case "semanal":
                date = isFirst ? date : date.add(1, "week");
                date = date.day("saturday");
                break;
            case "quincenal":
                if (!isFirst) {
                    if ([15, 30, 31].includes(day)) {
                        date = day <= 15
                            ? quincena.endOf("month")
                            : quincena.add(1, "month");
                    }
                    else {
                        let daysToAdd = day > 15 ? (15 + (endOfMonthNumber - 30)) : 15;
                        date = date.add(daysToAdd, 'days');
                    }
                }
                break;
            case "mensual":
                date = isFirst ? date : date.add(1, "month");
                break;
            default:
                if (!isNaN(parseInt(period))) {
                    if (!isFirst) {
                        date = date.add(period, "day");
                    }
                }
                else {
                    throw new Error("Periodo de cuota no válido");
                }
                break;
        }
        return date;
    },
    moveDateCuota(startDate, period) {
        let date = (0, moment_1.default)(startDate);
        period = typeof period === "string" ? period : String(period);
        const quincena = (0, moment_1.default)(date).date(15);
        const endOfMonth = (0, moment_1.default)(date).endOf("month");
        const endOfMonthNumber = Number((0, moment_1.default)(endOfMonth).format("DD"));
        const day = Number((0, moment_1.default)(date).format("DD"));
        switch (period.toLowerCase()) {
            case "diario":
                date = (0, moment_1.default)(date).add(1, "day");
                break;
            case "semanal":
                date = (0, moment_1.default)(date).add(1, "week").day("saturday");
                break;
            case "quincenal":
                let daysToAdd = day > 15 ? (15 + (endOfMonthNumber - 30)) : 15;
                date = (0, moment_1.default)(date).add(daysToAdd, 'days');
                break;
            case "mensual":
                date = (0, moment_1.default)(date).add(1, "month");
                break;
            default:
                if (!isNaN(parseInt(period))) {
                    date = (0, moment_1.default)(date).add(period, "d");
                }
                else {
                    throw new Error("Periodo de cuota no válido");
                }
                break;
        }
        return date.toDate();
    },
    getMora(amort) {
        let mora = 0;
        let initMora = 0;
        let finalMora = 0;
        const isExpired = (0, moment_1.default)().subtract(25, 'hours').isAfter((0, moment_1.default)(amort.getDataValue("expiresAt")));
        if (isExpired) {
            const diffInDays = (0, moment_1.default)().diff(amort.getDataValue("expiresAt"), 'days') - 1;
            const initDay = diffInDays >= amort.getDataValue("initTerm") ? amort.getDataValue("initTerm") : diffInDays;
            const finalDay = diffInDays - initDay > 0 ? (diffInDays - initDay) : 0;
            initMora = ((amort.getDataValue("cuota") * (amort.getDataValue("initRateMora"))
                / 100) * initDay);
            finalMora = (amort.getDataValue("cuota") * (amort.getDataValue("finalRateMora"))
                / 100) * finalDay;
            mora = initMora + finalMora;
        }
        initMora = Number(initMora.toFixed(2));
        finalMora = Number(finalMora.toFixed(2));
        mora = Number(mora.toFixed(2));
        return { mora, initMora, finalMora, isExpired };
    }
};
//# sourceMappingURL=amortization.js.map