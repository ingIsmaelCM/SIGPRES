import Client from "./Client";
import Info from "./Info";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
  static initRelation() {
    /* Client */
    Client.belongsTo(Info, {
      as: "info",
      foreignKey: "infoId",
    });

    /* Info */

    Info.hasOne(Client, {
      as: "client",
      foreignKey: "infoId",
    });
  }
}
