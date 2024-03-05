import { BaseRepository } from "@/app/repositories/BaseRepository";
import Wallet from "../models/Wallet";

export default class WalletRepository extends BaseRepository<Wallet> {
  constructor() {
    super(Wallet);
  }
}
