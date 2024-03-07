import Controller, {setAuthor} from "@/app/controllers/Controller";
import response from "@/app/utils/response";
import {Request} from "express"
import IController from "@/app/controllers/IController";
import ContactService from "@source/services/ContactService";
import ContactRoutes from "@source/routes/ContactRoutes";

export default class ContactController extends Controller implements IController {
    prefix: string = "contacts";
    mainService = new ContactService();

    constructor() {
        super();
        new ContactRoutes(this.router, this).initRoutes();
    }


    async getContacts(req: Request, res: any) {
        await this.safeRun(async () => {
           return await this.mainService.getContacts(req.query);
        }, res, 200)
    }
}