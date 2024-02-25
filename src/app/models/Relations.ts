import AuthRelation from "@/auth/models/AuthRelations";
import FileRelation from "@/file/models/FIleRelations";
import { Sequelize, Model, ModelStatic } from "sequelize";

export default class Relation {
  static initRelations() {
    AuthRelation.initRelations();
    FileRelation.InitRelation();
  }
}
