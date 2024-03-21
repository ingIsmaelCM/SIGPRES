import {BaseRepository} from "@app/repositories/BaseRepository";
import {Lawyer} from "@source/models";


export default class LawyerRepository extends  BaseRepository<Lawyer>{
    constructor() {
        super(Lawyer);
    }
}