import {BaseRepository} from "@app/repositories/BaseRepository";
import Document from "@source/models/Document";

export default class DocumentRepository extends BaseRepository<Document> {
    constructor() {
        super(Document);
    }
}