import moment, { Moment } from "moment";

export default {
  getAmortization(data: any): any {
    const { amount, term, rate, startAt, period } = data;
    let balance = amount;
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
      const interest = (balance * rate) / 100;
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
    const r = rate / 100;
    return (amount * r) / (1 - Math.pow(1 + r, -term));
  },
  getDateCuota(startAt: Date, period: string | number): Moment {
    let date = moment(startAt);
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
    return date;
  },
};
