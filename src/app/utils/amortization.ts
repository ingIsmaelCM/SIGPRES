import moment, {Moment} from "moment";
import {AmortizationView} from "@source/models";

export default {
    getAmortization(data: any): any {
        const {amount, term, rate, startAt, period, keepDate} = data;
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
        for (let i = 0; i < term; i++) {
            const interest = (Number(balance) * Number(rate)) / 100;

            const capital = cuota - interest;
            balance -= capital;
            payDate = this.getDateCuota(payDate, period);
            amortization.push({
                nro: i + 1,
                date: payDate.format("YYYY-MM-DD"),
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
    getDateCuota(startAt: Date, period: string | number, keepDate: boolean=false): Moment {
        let date = moment(startAt);
        period = typeof period == "string" ? period : String(period);
        switch (period.toLowerCase()) {
            case "diario":
                date = moment(date).add(1, "day");
                break;
            case "semanal":
                date = moment(date).day("saturday").add(1, "week");
                break;
            case "quincenal":
                const fechaInicioMes = moment(date).startOf("month");
                const quincena1 = moment(fechaInicioMes).date(15);
                const quincena2 = moment(fechaInicioMes).endOf("month");
                if (moment(date).isSame(moment(date).date(15))) {
                    date = moment(date).endOf("month");
                } else if (
                    moment(date).endOf("month").diff(moment(date), "days") <= 7
                    && !keepDate
                ) {
                    date = moment(date).startOf("month").add(1, "month").date(15);
                } else {
                    date = moment(date).isBefore(quincena1) ? quincena1 : quincena2;
                }
                break;
            case "mensual":
                const middleMonth = moment(moment(date)).date(15);
                let endMonth = moment(moment(date)).endOf("month");

                date = moment(date).isBefore(moment(middleMonth).add(1, "d"))
                    ? middleMonth
                    : endMonth;
                date = moment(date).add(1, "month").endOf("month");
                break;
            default:
                if (!isNaN(parseInt(period))) {
                    date = moment(date).add(period, "d");
                } else {
                    throw new Error("Periodo de cuota no válido");
                }
                break;
        }
        return date;
    },
    moveDateCuota(startDates: Date[], period: string | number): Date[] {
        return startDates.map(startDate => {
            let date = moment(startDate);
            period = typeof period == "string" ? period : String(period);
            switch (period.toLowerCase()) {
                case "diario":
                    date = moment(date).add(1, "day");
                    break;
                case "semanal":
                    date = moment(date).day("Saturday").add(1, "week");
                    break;
                case "quincenal":
                    const fechaInicioMes = moment(date).startOf("month");
                    const quincena1 = moment(fechaInicioMes).date(15);
                    const quincena2 = moment(fechaInicioMes).endOf("month");
                    if (moment(date).isSame(moment(date).date(15))) {
                        date = moment(date).endOf("month");
                    } else if (
                        moment(date).endOf("month").diff(moment(date), "days") <= 7
                    ) {
                        date = moment(date).startOf("month").add(1, "month").date(15);
                    } else {
                        date = moment(date).isBefore(quincena1) ? quincena1 : quincena2;
                    }
                    break;
                case "mensual":
                    const middleMonth = moment(moment(date)).date(15);
                    let endMonth = moment(moment(date)).endOf("month");

                    date = moment(date).isBefore(moment(middleMonth).add(1, "d"))
                        ? middleMonth
                        : endMonth;
                    date = moment(date).add(1, "month").endOf("month");
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
        });
    },
    getMora(amort: AmortizationView) {
        let mora = 0;
        let initMora=0;
        let finalMora=0;
        const isExpired = moment().isAfter(moment(amort.getDataValue("expiresAt")));
        if (isExpired) {
            const diffInDays = moment().diff(amort.getDataValue("expiresAt"), 'days') - 1
            const initDay = diffInDays >= amort.getDataValue("initTerm") ? amort.getDataValue("initTerm") : diffInDays;
            const finalDay = diffInDays - initDay > 0 ? (diffInDays - initDay) : 0;
            initMora = ((amort.getDataValue("cuota") * (amort.getDataValue("initRateMora"))
                / 100) * initDay);
            finalMora = (amort.getDataValue("cuota") * (amort.getDataValue("finalRateMora"))
                / 100) * finalDay;
            mora=initMora+finalMora;
        }
        initMora=Number(initMora.toFixed(2));
        finalMora=Number(finalMora.toFixed(2));
        mora=Number(mora.toFixed(2));
        return {mora, initMora, finalMora, isExpired}
    }
};
