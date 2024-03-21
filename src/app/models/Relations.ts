import AuthRelation from "@/auth/models/AuthRelations";
import FileRelation from "@source/models/FIleRelations";

export default class Relation {
  static initRelations() {
    AuthRelation.initRelations();
    FileRelation.InitRelation();
  }
}
