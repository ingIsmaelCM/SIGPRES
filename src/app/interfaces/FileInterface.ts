export interface IImage {
    id?: string;
    path: string;
    caption: string;
    publicId: string;
    size: number;
    imageableType: string;
    imageableId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IDocument {
    id?: string;
    path: string;
    title: string;
    publicId: string;
    size: number;
    documentableType: string;
    documentableId: string;
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