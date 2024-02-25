import "module-alias/register";

import config from "@app/app.config";
import { App } from "./src/AppInit";
import AppController from "@app/controllers/AppController";
import { AuthController } from "@auth/controllers/AuthController";
import Relation from "@app/models/Relations";
import response from "@app/utils/response";
import RoleController from "@/auth/controllers/RoleController";
import ImageController from "@/file/controllers/ImageController";
import PreferenceController from "@/app/controllers/PreferenceController";
import TenantController from "@/auth/controllers/TenantController";
const PORT = config.app.port;

const controllers = [
  new AuthController(),
  new AppController(),
  new RoleController(),
  new ImageController(),
  new PreferenceController(),
  new TenantController(),
];

const app = new App(controllers, PORT);
Relation.initRelations();

app.app.use("/api/*", (req: any, res: any) => {
  response.error(res, 404, "Not Found");
});
export default app;
app.listen();
