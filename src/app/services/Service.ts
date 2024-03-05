import TenantConnection from "../db/TenantConnection";
export default class Service {
  protected async safeRun(
    method: () => Promise<any>,
    cbError?: () => Promise<any>
  ): Promise<any> {
    try {
      TenantConnection.getConnection();
      return await method();
    } catch (error: any) {
      cbError && (await cbError());
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
