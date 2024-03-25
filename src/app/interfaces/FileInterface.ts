export interface IImage {
    id?: number;
    path: string;
    caption: string;
    publicId: string;
    size: number;
    imageableType: string;
    imageableId: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IDocument {
    id?: number;
    path: string;
    title: string;
    publicId: string;
    size: number;
    documentableType: string;
    documentableId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IImageRelation {
}

export interface IDocumentRelation {
}


export enum EImageable {
    Client = "Client",
    Contact = "Contact",
    Loan = "Loan",
    Payment = "Payment",
    Lawyer = "Lawyer",
    Job = "Job"
}

export enum EDocumentable {
    Client = "Client",
    Contact = "Contact",
    Loan = "Loan",
    Payment = "Payment",
    Lawyer = "Lawyer",
    Job = "Job",
}