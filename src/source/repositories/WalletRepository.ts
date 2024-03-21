import { BaseRepository } from "@/app/repositories/BaseRepository";
import {Wallet} from "@source/models";

export default class WalletRepository extends BaseRepository<Wallet> {
  constructor() {
    super(Wallet);
  }
}
