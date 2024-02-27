import { BaseRepository } from "@/app/repositories/BaseRepository";
import Contact from "@source/models/Contact";

export default class ContactRepository extends BaseRepository<Contact> {
  constructor() {
    super(Contact);
  }
}
