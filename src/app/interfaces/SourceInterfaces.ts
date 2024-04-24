import {ICommonField} from "@app/interfaces/AppInterfaces";
import {IDocument, IImage} from "@app/interfaces/FileInterface";
import {IAuth} from "@app/interfaces/AuthInterfaces";

export interface IAmortization extends ICommonField {
    date: string;
    nro: number;
    cuota: number;
    capital: number;
    interest: number;
    mora: number;
    balance: number;
    status: EAmortizationStatus;
    loanId: string;
    clientId: string;
}

export interface IAmortizationRelation {
    loan: ILoan;
    client: IClient;
    'loan.client': ILoan,
    'loan.condition': ILoan,
    'loan.lawyer': ILoan,
    'loan.guarantor': ILoan,
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
    infoId?: string;
    clienttype: EClientType;
}

export interface IClientView extends IClient {
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface IContactView extends IContact {
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface ILawyerView extends ILawyer {
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface IJobView extends IJob {
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface IAmortizationView extends IAmortization, ICondition {
    isExpired: boolean,
    expiresAt: string,
    mora: number,
    initMora: number,
    finalMora: number
}

export interface IClientContactView extends IContactView, IClientContact {
    relationId: string
}

export interface IUserView extends IAuth {
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
}

export interface IUserViewRelation {

}

export interface IPaymentStatView {
    loanCode: string;
    clientId: string;
    loanId: string;
    averageDiffInDay: number;
    onTime: number;
    percentOnTime: number;
    outTime: number;
    percentOutTime: number;
    modaWallet: string;
    averageAbonoCapital: number;
    totalAbonoCapital: number;
    totalCapitalOnCuota: number;
    totalCapital: number;
    totalInterest: number;
    totalAmount: number;
    initialMora: number;
    finalMora: number;
    mora: number;
    totalUtility: number;
    percentUtility: number,
    loanAmount: number;
    loanBalance: number;
    loanPayedPercent: number
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

export interface IClientContact extends ICommonField {
    clientId: string,
    contactId: string,
    relationship: EClientContactRelationship,
    isGarante: 0 | 1
}

export enum EClientContactRelationship {
    Conyuge = "Conyuge",
    Familiar = "Familiar",
    Amigo = "Amigo",
    Conocido = "Conocido",
    Otro = "Otro",
}

export default interface IClientContactRelation {
    client: IClient,
    contact: IContact
}

export interface ICondition extends ICommonField {
    initTerm: number;
    initRateMora: number;
    finalRateMora: number;
    loanId: string;
    clientId: string;
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
    infoId?: string;
    fullname?: string;
}

export interface IContactRelation {
    info: IInfo;
    clients: IClientView[];
    profile?: IImage;
}

export interface IExpense extends ICommonField {
    amount: number;
    date: string;
    concepto: string;
    walletId: string;
    lawyerId?: string;
}

export interface IExpenseRelation {
    wallet: IWallet;
    lawyer: ILawyer;
}

export interface IInfo {
    id: string;
    dni: string;
    phone: string;
    email?: string;
    birthdate?: string;
    address?: string;
    gender: EInfoGender;
    country: string;
    type: string;
    note?:string;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IInfoRelation {
    image: IImage;
    document: IDocument;
}

export enum EInfoModels {
    Client = "Client",
    Lawyer = "Lawyer",
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
    info: IInfo;
    client: IClient;
    image: IImage;
    document: IDocument;
}

export interface ILawyer extends ICommonField {
    name: string;
    lastname: string;
    exequatur?: string;
    payMode: ELawyerPaymode;
    payPrice: number;
    infoId?: string;
    fullname?: string;
}

export interface ILawyerPayment extends ICommonField {
    amount: number;
    loanId?: string;
    paymentId?: string;
    walletId?: string;
    lawyerId: string;
    status: ELawyerPaymentStatus;
    date?: string;
    closedAt?: string;
    payPrice: number;
}

export interface ILawyerPaymentRelation {
    lawyer: ILawyerView;
    loan: ILoan;
    payment: IPayment;
    wallet: IWallet
}

export enum ELawyerPaymentStatus {
    Pendiente = "Pendiente",
    Pagado = "Pagado",
    Cancelado = "Cancelado"

}

export enum ELawyerPaymode {
    Mensual = "Mensual",
    Porcentaje = "Porcentaje de Cobro",
    Cuota = "Cuota de Cobro",
    Contrato = "Por Contrato"
}

export interface ILawyerRelation {
    info: IInfo;
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
    type: ELoanType
    clientId: string;
    lawyerId: string;
    walletId: string;
    guarantorId: string;
}

export enum ELoanType {
    Fixed = "Tasa Fija",
    Variable = "Tasa Variable"
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
    Pagado = "Pagado",
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
    mora: number;
    status: EMoraStatus;
    dueAt: string;
    closedAt: string;
    loanId: string;
    clientId: string;
    paymentId: string;
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
    mora: number;
    balanceBefore: number;
    balanceAfter: number;
    dueAt: string;
    payedAt: string;
    note?: string;
    walletId: string;
    loanId: string;
    clientId: string;
    lawyerId?: string;
}

export interface IPaymentRelation {
    wallet: IWallet;
    loan: ILoan;
    lawyer?: ILawyer;
    client: IClient;
    moratoria?: IMora;
    images: IImage[];
    "loan.client": ILoan,
    "loan.condition": ILoan,
    "loan.wallet": ILoan
}

export interface ISocial extends ICommonField {
    facebook: string;
    instagram: string;
    whatsapp: string;
    clientId: string;
}

export interface ISocialRelation {
    client: IClient
}

export interface IWallet extends ICommonField {
    name: string;
    balance: number;
    authId: string;
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
    type: string
}

export interface IPreferenceRelation {
}

export  interface  ICard extends  ICommonField{
    value: string;
    ending: number;
    holdname: string;
    brand: string;
    clientId: string;
}

export interface  ICardRelation{
    client: IClientView;
}