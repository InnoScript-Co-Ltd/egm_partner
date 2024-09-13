import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./modules/auth/authRoutes";
import { dashboardRoute } from "./modules/dashboard/dashboardRoute";
import { bankAccountRoutes } from "./modules/bank/bankAccountRoutes";

export const AppRouters = createBrowserRouter([
    ...authRoutes,
    ...dashboardRoute,
    ...bankAccountRoutes
]);