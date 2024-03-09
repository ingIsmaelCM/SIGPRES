import "module-alias/register";

import config from "@app/app.config";
import {App} from "@/AppInit";
import Relation from "@app/models/Relations";
import response from "@app/utils/response";
import AppRoutes from "@app/routes/AppRoutes";
import RoleRoutes from "@auth/routes/RoleRoutes";
import ImageRoutes from "@file/routes/ImageRoutes";
import PreferenceRoutes from "@app/routes/PreferenceRoutes";
import TenantRoutes from "@auth/routes/TenantRoutes";
import ClientRoutes from "@source/routes/ClientRoutes";
import InfoRoutes from "@source/routes/InfoRoutes";
import LoanRoutes from "@source/routes/LoanRoutes";
import WalletRoutes from "@source/routes/WalletRoutes";
import ContactRoutes from "@source/routes/ContactRoutes";
import JobRoutes from "@source/routes/JobRoutes";

const PORT = config.app.port;

const routes = [
    new AppRoutes(),
    new RoleRoutes(),
    new ImageRoutes(),
    new PreferenceRoutes(),
    new TenantRoutes(),
    new ClientRoutes(),
    new InfoRoutes(),
    new LoanRoutes(),
    new WalletRoutes(),
    new ContactRoutes(),
    new JobRoutes()

];

const app = new App(routes, PORT);
Relation.initRelations();

app.app.use("/api/*", (req: any, res: any) => {
    response.error(res, 404, "Not Found");
});
app.listen();


export default app