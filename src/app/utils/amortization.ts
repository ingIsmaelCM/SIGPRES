import moment, {Moment} from "moment-timezone";
import {AmortizationView} from "@source/models";
export default {
    getAmortization(data: any): any {
        const {amount, term, rate, startAt, period} = data;
        let balance = Number(amount);
        const cuota = this.getCuota(amount, term, rate);
        const amortization: {
            nro: number;
            date: String;
            cuota: number;
            capital: number;
            interest: number;
            balance: number;
        }[] = [];

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
    getCuota(amount: number, term: number, rate: number): number {
        if (rate > 0) {
            const rateIndex = Number(rate) / 100;
            return (amount * rateIndex) / ((1 - Math.pow(1 + rateIndex, -term)));
        }
        return amount / term;
    },
    getCantidadCuotas(amount: number, rate: number, cuota: number) {
        if (rate > 0) {
            const rateIndex = rate / 100;
            return -Math.log(1 - (amount * rateIndex) / cuota) / Math.log(1 + rateIndex);
        }
        return amount / cuota;
    },
    getDateCuota(startAt: Date, period: string | number, isFirst: boolean = false): Moment {
        let date = moment(startAt);
        period = typeof period == "string" ? period : String(period);
        const quincena = moment(date).date(15);
        const endOfMonth = moment(date).endOf("month")
        const endOfMonthNumber = Number(moment(endOfMonth).format("DD"))
        const day = Number(moment(date).format("DD"))

        switch (period.toLowerCase()) {
            case "diario":
                date = isFirst ? date : date.add(1, "day")
                break;
            case "semanal":
                date = isFirst ? date : date.add(1, "week");
                date = date.day(6)
                break;
            case "quincenal":
                if (!isFirst) {
                    if ([15, 30, 31].includes(day)) {
                        date = day <= 15
                            ? quincena.endOf("month")
                            : quincena.add(1, "month")
                    } else {
                        let daysToAdd = day > 15 ? (15 + (endOfMonthNumber - 30)) : 15;
                        date = date.add(daysToAdd, 'days')
                    }
                }
                break;
            case "mensual":
                const endFebruary = moment(date).month(1).endOf("month");
                if (date.format("DD/MM/YYYY") === endFebruary.format("DD/MM/YYYY")) {
                    date = isFirst ? date : date.add(1, "month").endOf("month");
                } else {
                    date = isFirst ? date : date.add(1, "month");
                }
                break;
            default:
                if (!isNaN(parseInt(period))) {
                    if (!isFirst) {
                        date = date.add(period, "day")
                    }
                } else {
                    throw new Error("Periodo de cuota no válido");
                }
                break;
        }
        return date;
    },
    moveDateCuota(startDate: Date, period: string | number): Date {
        let date = moment(startDate);
        period = typeof period === "string" ? period : String(period);
        const endOfMonth = moment(date).endOf("month")
        const endOfMonthNumber = Number(moment(endOfMonth).format("DD"))
        const day = Number(moment(date).format("DD"))
        switch (period.toLowerCase()) {
            case "diario":
                date = moment(date).add(1, "day");
                break;
            case "semanal":
                date = moment(date).add(1, "week").day(6);
                break;
            case "quincenal":
                let daysToAdd = day > 15 ? (15 + (endOfMonthNumber - 30)) : 15;
                date = moment(date).add(daysToAdd, 'days')
                break;
            case "mensual":
                const endFebruary = moment(date).month(1).endOf("month");
                if (date.format("DD/MM/YYYY") === endFebruary.format("DD/MM/YYYY")) {
                    date = moment(date).add(1, "month").endOf("month");
                } else {
                    date = moment(date).add(1, "month");
                }

                break;
            default:
                if (!isNaN(parseInt(period))) {
                    date = moment(date).add(period, "d");
                } else {
                    throw new Error("Periodo de cuota no válido");
                }
                break;
        }
        return date.toDate();
    },
    getMora(amort: AmortizationView) {
        let mora = 0;
        let initMora = 0;
        let finalMora = 0;
        const isExpired = moment().subtract(25, 'hours').isAfter(moment(amort.getDataValue("expiresAt")));
        if (isExpired) {
            const diffInDays = moment().diff(amort.getDataValue("expiresAt"), 'days') - 1
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
        return {mora, initMora, finalMora, isExpired}
    }
};
