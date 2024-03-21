import { BaseRepository } from "@/app/repositories/BaseRepository";
import {Amortization} from "@source/models";

export default class AmortizationRepository extends BaseRepository<Amortization> {
  constructor() {
    super(Amortization);
  }
}
