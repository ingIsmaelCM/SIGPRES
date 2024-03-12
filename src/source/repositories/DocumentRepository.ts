import {BaseRepository} from "@app/repositories/BaseRepository";
import Document from "@file/models/Document";

export default class DocumentRepository extends BaseRepository<Document> {
    constructor() {
        super(Document);
    }
}