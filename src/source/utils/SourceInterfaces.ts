import { ICommonField } from "@/app/utils/AppInterfaces";
import { IDocument, IImage } from "@/file/utils/FileInterface";

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
  info?: IInfo;
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
  info?: IInfo;
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

export interface IInfoRelation {
  image: IImage;
  document: IDocument;
}

export interface IJob extends ICommonField {
  startAt: string;
  salary: number;
  position: string;
  company: string;
  infoId?: string;
  clientId: string;
}

export interface IJobRelation {
  info?: IInfo;
  client: IClient;
  image: IImage;
  document: IDocument;
}

export interface ILawyer extends ICommonField {
  name: string;
  lastname: string;
  exequatur?: string;
  infoId?: number;
}

export interface ILawyerRelation {
  info?: IInfo;
  loans: ILoan[];
  payments: IPayment[];
  expenses: IExpense[];
  image: IImage;
  document: IDocument;
}

export interface ILoan extends ICommonField {
  amount: number;
  balance: number;
  startAt: string;
  endAt: string;
  rate: number;
  deadlines: number;
  grace: number;
  clientId: number;
  lawyerId: number;
}

export interface ILoanRelation {
  lawyer: ILawyer;
  client: IClient;
  condition: ICondition;
  images: IImage[];
  documents: IDocument;
  payments: IPayment[];
  moras: IMora[];
  amortizations: IAmortization[];
}

export interface IMora extends ICommonField {
  initAmount: number;
  lateAmount: number;
  status: EMoraStatus;
  dueAt: string;
  closedAt: string;
  loanId: number;
  clientId: number;
  paymentId: number;
}

export interface IMoraRelation {
  client: IClient;
  payment: IPayment;
  loan: ILoan;
}

export enum EMoraStatus {
  Cobrada = "Cobrada",
  Perdonada = "Perdonada",
}

export interface IPayment extends ICommonField {
  amount: number;
  capital: number;
  interest: number;
  balanceBofore: number;
  balanceAfter: number;
  dueAt: string;
  payedAt: string;
  note?: string;
  walletId: number;
  loanId: number;
  clientId: null;
  lawyerId?: number;
}

export interface IPaymentRelation {
  wallet: IWallet;
  loan: ILoan;
  lawyer?: ILawyer;
  client: IClient;
  mora?: IMora;
  image?: IImage;
}

export interface IWallet extends ICommonField {
  name: string;
  balance: number;
}

export interface IWalletRelation {
  payments: IPayment[];
  expenses: IExpense[];
}

export interface IPreference extends ICommonField {
  key: string;
  value: string;
  label: string;
}

export interface IPreferenceRelation {}
