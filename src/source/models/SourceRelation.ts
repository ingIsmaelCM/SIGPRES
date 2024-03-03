import Client from "./Client";
import Info from "./Info";
import Image from "@file/models/Image";
import Loan from "./Loan";
import Lawyer from "./Lawyer";
import Contact from "./Contact";
import Condition from "./Condition";
import Payment from "./Payment";

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
        imageableType: "client",
      },
    });
    Client.hasOne(Image, {
      foreignKey: "imageableId",
      as: "profile",
      scope: {
        imageableType: "client",
        caption: "Perfil Cliente",
      },
    });

    Client.hasMany(Loan, {
      foreignKey: "clientId",
      as: "loans",
    });

    /* Info */

    Info.hasOne(Client, {
      as: "client",
      foreignKey: "infoId",
    });

    /* Loan */
    Loan.belongsTo(Contact, {
      foreignKey: "lawyerId",
      as: "guarantor",
    }),
      Loan.belongsTo(Lawyer, {
        foreignKey: "lawyerId",
        as: "lawyer",
      }),
      Loan.hasOne(Condition, {
        foreignKey: "conditionId",
        as: "condition",
      }),
      Loan.hasMany(Image, {
        foreignKey: "imageableId",
        as: "images",
        scope: {
          imageableType: "loan",
        },
      }),
      Loan.hasMany(Payment, {
        as: "payments",
        foreignKey: "loanId",
      }),
      Loan.belongsTo(Client, {
        foreignKey: "clientId",
        as: "client",
      });
  }
} /* 
      "documents",
      "payments",
      "moras",
      "amortizations", */
