export interface IModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  getSearchables(): string[];
  getRelations(): string[];
}
