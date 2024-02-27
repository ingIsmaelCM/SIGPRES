import AuthRelation from "@/auth/models/AuthRelations";
import FileRelation from "@/file/models/FIleRelations";
import SourceRelation from "@/source/models/SourceRelation";

export default class Relation {
  static initRelations() {
    AuthRelation.initRelations();
    FileRelation.InitRelation();
  }
}
