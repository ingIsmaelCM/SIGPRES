import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize"
import {IDocument, IDocumentRelation} from "@app/interfaces/FileInterface";
import ITM from "@app/models/ITenantModel";

@ITM.staticImplements<IDocument, IDocumentRelation>()
export default class Document extends Model implements IDocument {
    static additionalOptions = {}
    static tableName = "documents";
    static modelName = "Document"
    static attributes: Record<keyof IDocument, ModelAttributeColumnOptions> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        documentableType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documentableId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }
    declare id: number;
    declare path: string;
    declare size: number;
    declare title: string;
    declare publicId: string;
    declare createdAt: string;
    declare deletedAt: string;
    declare documentableId: number;
    declare documentableType: string;
    declare updatedAt: string;

    getSearchables(): Array<keyof IDocument> {
        return ["path", "title", "size", "documentableType", "documentableId"]
    }

    getRelations(): Array<keyof IDocumentRelation> {
        return []
    }


}