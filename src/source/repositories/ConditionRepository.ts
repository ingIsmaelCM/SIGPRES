import { BaseRepository } from "@/app/repositories/BaseRepository";
import Condition from "@source/models/Condition";

export default class ConditionRepository extends BaseRepository<Condition> {
  constructor() {
    super(Condition);
  }
}
