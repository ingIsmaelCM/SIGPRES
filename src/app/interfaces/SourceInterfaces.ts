import {ICommonField} from "@app/interfaces/AppInterfaces";
import {IDocument, IImage} from "@app/interfaces/FileInterface";

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
    code?: string;
    name: string;
    lastname: string;
    fullname?: string;
    infoId?: number;
    clienttype: EClientType;
}

export enum EClientType {
    Persona = "Persona",
    Negocio = "Negocio",
}

export interface IClientRelation {
    info: IInfo;
    loans: ILoan[];
    images: IImage[];
    profile?: IImage;
    documents: IDocument[];
    contacts: IContact[];
    jobs: IJob[]
    social: ISocial;

    payments: IPayment[];
    moras: IMora[];
    "loans.payments": ILoan[];
    "payments.mora": IPayment[];
    "contacts.info": IContact[];
    "jobs.info": IJob[];
}

export interface ICondition extends ICommonField {
    initTerm: number;
    initRateMora: number;
    finalRateMora: number;
    loanId: number;
    clientId: number;
    grace: number;
    rate: number;
}

export interface IConditionRelation {
    loan: ILoan;
    client: IClient;
}

export interface IContact extends ICommonField {
    name: string;
    lastname: string;
    infoId?: number;
    fullname?: string;
}

export interface IContactRelation {
    info?: IInfo;
    clients: IClient[];
    "clients.info": IClient[]
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
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface IInfoRelation {
    image: IImage;
    document: IDocument;
}

export enum EInfoModels {
    Client = "Client",
    Lawyer = "Cawyer",
    Contact = "Contact",
    Job = "Job"
}

export enum EInfoGender {
    Masculino = "Masculino",
    Femenino = "Femenino",
    Ninguno = "Ninguno",
}

export interface IJob extends ICommonField {
    startAt: string;
    endAt?: string;
    status: EJobStatus;
    salary: number;
    position: string;
    company: string;
    infoId?: string;
    clientId: string;
}

export enum EJobStatus {
    Actual = "Actual",
    Anterior = "Anterior"
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
    code: string;
    amount: number;
    balance: number;
    startAt: string;
    endAt: string;
    nextPaymentAt: string;
    term: number;
    status: ELoanStatus;
    period: ELoanPeriod | number;
    clientId: number;
    lawyerId: number;
    walletId: number;
    guarantorId: number;
}

export enum ELoanPeriod {
    Diario = "diario",
    Semanal = "semanal",
    Quincenal = "quincenal",
    Mensual = "mensual",
}

export enum ELoanStatus {
    Pendiente = "Pendiente",
    Aprobado = "Aprobado",
    Rechazado = "Rechazado",
}

export interface ILoanRelation {
    lawyer?: ILawyer;
    guarantor?: IContact;
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
    balanceBefore: number;
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
    images: IImage[];
}

export interface ISocial extends  ICommonField{
    facebook: string;
    instagram: string;
    whatsapp: string;
    clientId: number;
}

export interface  ISocialRelation{
    client: IClient
}

export interface IWallet extends ICommonField {
    name: string;
    balance: number;
}

export interface IWalletRelation {
    payments: IPayment[];
    expenses: IExpense[];
    loans: ILoan[];
}

export interface IPreference extends ICommonField {
    key: string;
    value: string;
    label: string;
}

export interface IPreferenceRelation {
}