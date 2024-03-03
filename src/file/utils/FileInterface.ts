export interface IImage {
  id?: number;
  path: string;
  caption: string;
  size: number;
  imageableType: string;
  imageableId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IDocument {
  id?: number;
  path: string;
  title: string;
  size: number;
  documentableType: string;
  documentableId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface IImageRelation {}
export interface IDocumentRelation {}
