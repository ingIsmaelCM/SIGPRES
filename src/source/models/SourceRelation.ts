import {DataTypes} from "sequelize";
import Client from "@source/models/Client";
import Info from "@source/models/Info";
import Image from "@source/models/Image";
import Loan from "@source/models/Loan";
import Lawyer from "@source/models/Lawyer";
import Contact from "@source/models/Contact";
import Condition from "@source/models/Condition";
import Payment from "@source/models/Payment";
import Amortization from "@source/models/Amortization";
import Job from "@source/models/Job";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";
import Document from "@source/models/Document";
import Social from "@source/models/Social";
import TenantConnection from "@app/db/TenantConnection";
import {ClientContact} from "@source/models/index";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation() {

        /* Client */
        Client.belongsTo(Info, {
            as: "info",
            foreignKey: "infoId",
        });

        Client.hasMany(Image, {
            foreignKey: "imageableId",
            as: "images",
            scope: {
                imageableType: EImageable.Client,
            },
        });

        Client.hasMany(Document, {
            foreignKey: "documentableId",
            as: "documents",
            scope: {
                documentableType: EDocumentable.Client
            }
        })
        Client.hasOne(Image, {
            foreignKey: "imageableId",
            as: "profile",
            scope: {
                imageableType: EImageable.Client,
                caption: "Perfil Cliente",
            },
        });
        Client.hasOne(Social, {
            foreignKey: "clientId",
            as: "social"
        })

        Client.hasMany(Loan, {
            foreignKey: "clientId",
            as: "loans",
        });

        Client.belongsToMany(Contact, {
            through: ClientContact,
            as: "contacts"
        })

        Client.hasMany(Job,
            {
                foreignKey: "clientId",
                as: "jobs"
            })
        // Contact

        Contact.belongsToMany(Client, {
            through: ClientContact,
            as: "clients"
        })

        Contact.belongsTo(Info,
            {
                as: "info",
                foreignKey: "infoId",

            })

        /* Info */

        Info.hasOne(Client, {
            as: "client",
            foreignKey: "infoId",
        });

        Info.hasOne(Contact, {
            as: "contact",
            foreignKey: "infoId",
        });

        Info.hasOne(Lawyer, {
            as: "laywer",
            foreignKey: "infoId",
        });

        Info.hasOne(Job, {
            as: "job",
            foreignKey: "infoId",
        });

        /* Loan */
        Loan.belongsTo(Contact, {
            foreignKey: "lawyerId",
            as: "guarantor",
        });
        Loan.belongsTo(Lawyer, {
            foreignKey: "lawyerId",
            as: "lawyer",
        });
        Loan.hasOne(Condition, {
            foreignKey: "loanId",
            as: "condition",
        });
        Loan.hasMany(Image, {
            foreignKey: "imageableId",
            as: "images",
            scope: {
                imageableType: "loan",
            },
        });
        Loan.hasMany(Payment, {
            as: "payments",
            foreignKey: "loanId",
        });
        Loan.hasMany(Amortization, {
            as: "amortizations",
            foreignKey: "loanId",
        });
        Loan.belongsTo(Client, {
            foreignKey: "clientId",
            as: "client",
        });

        Social.belongsTo(Client, {
            foreignKey: "clientId",
            as: "client"
        })
    }
} /* 
      "documents",
      "moras",
      "amortizations", */
