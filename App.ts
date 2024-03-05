import "module-alias/register";

import config from "@app/app.config";
import { App } from "@/AppInit";
import AppController from "@app/controllers/AppController";
import Relation from "@app/models/Relations";
import response from "@app/utils/response";
import RoleController from "@/auth/controllers/RoleController";
import ImageController from "@/file/controllers/ImageController";
import PreferenceController from "@/app/controllers/PreferenceController";
import TenantController from "@/auth/controllers/TenantController";
import ClientController from "@/source/controllers/ClientController";
import InfoController from "@/source/controllers/InfoController";
import LoanController from "@/source/controllers/LoanController";
import WalletController from "@/source/controllers/WalletController";
const PORT = config.app.port;

const controllers = [
  new AppController(),
  new RoleController(),
  new ImageController(),
  new PreferenceController(),
  new TenantController(),
  new ClientController(),
  new InfoController(),
  new LoanController(),
  new WalletController(),
];

const app = new App(controllers, PORT);
Relation.initRelations();

app.app.use("/api/*", (req: any, res: any) => {
  response.error(res, 404, "Not Found");
});
app.listen();
