export interface IModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  getSearchables(): string[];
  getRelations(): string[];
}
