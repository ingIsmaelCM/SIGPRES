import { ICommonField } from "@/app/utils/AppInterfaces";

export interface IAmortization extends ICommonField {
  date: string;
  cuota: number;
  capital: number;
  interest: number;
  balance: number;
  status: EAmortizationStatus;
  loanId: number;
  clientId: number;
}

export interface IAmortizationRelation {
  loan: ILoan;
  client: IClient;
}

export enum EAmortizationStatus {
  Pendiente = "Pendiente",
  Pagado = "Pagado",
  Cancelado = "Cancelado",
}

export interface IClient extends ICommonField {
  name: string;
  lastname: string;
  infoId?: number;
}

export interface IClientRelation {
  info: IInfo;
  loans: ILoan[];
  payments: IPayment[];
  moras: IMora[];
}

export interface ICondition extends ICommonField {
  initDeadline: number;
  initRateMora: number;
  finalRateMora: number;
  loanId: number;
  clientId: number;
}

export interface IConditionRelation {
  loan: ILoan;
  client: IClient;
}

export interface IContact extends ICommonField {
  name: string;
  lastname: string;
  infoId?: number;
  clientId: number;
}

export interface IContactRelation {
  info: IInfo;
  client: IClient;
}

export interface IExpense extends ICommonField {
  amount: number;
  date: string;
  concepto: string;
  walletId: number;
  lawyerId?: number;
}

export interface IExpenseRelation {
  wallet: IWallet;
  lawyer: ILawyer;
}

export interface IInfo extends ICommonField {
  dni: string;
  phone: string;
  email: string;
  birthdate: string;
  address: string;
}

export interface IJob extends ICommonField {
  startAt: string;
  salary: number;
  position: string;
  company: string;
  infoId: string;
  clientId: string;
}

export interface IJobRelation {
  info: IInfo;
  client: IClient;
}

export interface ILawyer extends ICommonField {
  name: string;
  lastname: string;
  exequatur: string;
  infoId: number;
}

export interface ILawyerRelation {
  info: IInfo;
  loans: ILoan[];
  payments: IPayment[];
  expenses: IExpense[];
}

export interface ILoan extends ICommonField {}

export interface IMora extends ICommonField {}

export interface IPayment extends ICommonField {}

export interface IWallet extends ICommonField {}
