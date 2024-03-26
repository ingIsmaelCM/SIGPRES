import AppRoutes from "@app/routes/AppRoutes";
import RoleRoutes from "@auth/routes/RoleRoutes";
import TenantRoutes from "@auth/routes/TenantRoutes";
import BaseRoutes from "@app/routes/BaseRoutes";
import UserRoutes from "@auth/routes/UserRoute";

const authRoutes: BaseRoutes<any>[]=[
    new AppRoutes(),
    new RoleRoutes(),
    new TenantRoutes(),
    new UserRoutes(),
]

export default authRoutes