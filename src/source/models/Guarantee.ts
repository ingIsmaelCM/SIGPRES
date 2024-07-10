import {EGuaranteeStatus, IGuarantee, IGuaranteeRelation} from "@app/interfaces/SourceInterfaces";
import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import ITM from "@app/models/ITenantModel";
import tools from "@app/utils/tools";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";


@ITM.staticImplements<IGuarantee, IGuaranteeRelation>()
export default class Guarantee extends Model implements IGuarantee {
    declare attributes: string;
    declare clientId: string;
    declare createdAt: string;
    declare createdBy: string;
    declare deletedAt: string;
    declare id: string;
    declare loanId: string;
    declare name: string;
    declare status: EGuaranteeStatus;
    declare updatedAt: string;
    declare updatedBy: string;
    declare value: number;

    static tableName = "guarantees";
    static modelName = "Guarantee";
    static additionalOptions = {};

    static attributes: Record<keyof IGuarantee, ModelAttributeColumnOptions> = {
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            set(this: Guarantee, val: string) {
                this.setDataValue('name', tools.initialToUpper(val))
            }
        },
        status: {
            type: DataTypes.ENUM(...Object.values(EGuaranteeStatus)),
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        loanId: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        clientId: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        attributes: {
            type: DataTypes.STRING,
            allowNull: false,
            get(this: Guarantee){
                return JSON.parse(this.getDataValue('attributes')||'{}')
            },
            set(this: Guarantee, val: any){
                if(typeof val !=='object'){
                    throw {
                        code: 422,
                        message: 'El campo attributes debe ser un objeto'
                    }
                }
                this.setDataValue("attributes", JSON.stringify(val))
            }
        },
        ...ITM.commonAttributes,
    }

    static getSearchables(): Array<keyof IGuarantee> {
        return ["name", "value", "loanId", "clientId", "attributes"]
    }

    static getRelations(): Array<keyof IGuaranteeRelation> {
        return ["client", "loan", 'images', 'documents']
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("Guarantee")
            .belongsTo(sequelize.model("Client"), {
                foreignKey: "clientId",

                as: "client",
                targetKey:"id",
                onDelete: "CASCADE"
            });
        sequelize.model("Guarantee")
            .belongsTo(sequelize.model("Loan"), {
                foreignKey: "loanId",
                as: "loan",
                targetKey:"id",
                onDelete: "CASCADE"
            });
        sequelize.model("Guarantee")
            .hasMany(sequelize.model("Image"), {
                foreignKey: "imageableId",
                scope: {
                    imageableType: EImageable.Guarantee,
                },
                as: "images"
            })

        sequelize.model("Guarantee")
            .hasMany(sequelize.model("Document"), {
                foreignKey: "documentableId",
                scope: {
                    imageableType: EDocumentable.Guarantee,
                },
                as: "documents"
            })

    }

}