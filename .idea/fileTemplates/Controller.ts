import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ${MODEL_NAME}Service from "@source/services/${MODEL_NAME}Service";

export default class ${MODEL_NAME}Controller extends Controller implements IController {
    prefix: string = '${MODEL_NAME_LOWER}s';
    mainService = new ${MODEL_NAME}Service()

    
    async index(req: Request, res: Response){
        return this.safeRun(async()=>
            this.mainService.get${MODEL_NAME}s(req.query),
            res, 200, ""
        )
    }
    
    async show(req: Request, res: Response){
        return this.safeRun(async()=>
            this.mainService.find${MODEL_NAME}(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response){
        return this.safeRun(async()=>
            this.mainService.create${MODEL_NAME}(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response){
        return this.safeRun(async()=>
            this.mainService.update${MODEL_NAME}(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response){
        return this.safeRun(async()=>
           this.mainService.delete${MODEL_NAME}(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response){
        return this.safeRun(async()=>
            this.mainService.restore${MODEL_NAME}(Number(req.params.id)),
            res, 200, ""
        )
    }
}