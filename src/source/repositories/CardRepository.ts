import {BaseRepository} from "@app/repositories/BaseRepository";
import {Card} from "@source/models";

export default class CardRepository extends BaseRepository<Card> {
    constructor() {
        super(Card);
    }
}