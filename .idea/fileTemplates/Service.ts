import Service from "@app/services/Service";
import  {IParams} from "@app/utils/AppInterfaces";
import ${CLASS_NAME}Repository from "@source/repositories/${CLASS_NAME}Repository";
import TenantConnection from "@app/db/TenantConnection";
import {I${CLASS_NAME}} from "@source/utils/SourceInterfaces";

export default class ${CLASS_NAME}Service extends Service {
    private mainRepo = new ${CLASS_NAME}Repository();

    async get${CLASS_NAME}s(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async find${CLASS_NAME}(${CLASS_NAME_LOWER}Id: number, params: IParams) {
        return await this.mainRepo.findById(${CLASS_NAME_LOWER}Id, params)
    }

    async create${CLASS_NAME}(data: I${CLASS_NAME}): Promise<I${CLASS_NAME}> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async update${CLASS_NAME}(${CLASS_NAME_LOWER}Id: number, data: I${CLASS_NAME}): Promise<I${CLASS_NAME}> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async delete${CLASS_NAME}(${CLASS_NAME_LOWER}Id: number): Promise<I${CLASS_NAME}> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restore${CLASS_NAME}(${CLASS_NAME_LOWER}Id: number): Promise<I${CLASS_NAME}> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}