import "module-alias/register";

import config from "@app/app.config";
import {App} from "@/AppInit";
import Relation from "@app/models/Relations";
import response from "@app/utils/response";

import sourceRoutes from "@source/routes";
import authRoutes from "@auth/routes";


const PORT = config.app.port;

const routes = [
    ...sourceRoutes,
    ...authRoutes


];

const app = new App(routes, PORT);
Relation.initRelations();

app.app.use("/api/*", (req: any, res: any) => {
    response.error(res, 404, "Not Found");
});
app.listen();


export default app