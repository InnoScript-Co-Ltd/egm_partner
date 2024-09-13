import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./modules/auth/authRoutes";
import { dashboardRoute } from "./modules/dashboard/dashboardRoute";
import { bankAccountRoutes } from "./modules/bank/bankAccountRoutes";
import { referralRoutes } from "./modules/referral/referralRoutes";
import { depositRoutes } from "./modules/deposit/depositRoutes";

export const AppRouters = createBrowserRouter([
    ...authRoutes,
    ...dashboardRoute,
    ...bankAccountRoutes,
    ...referralRoutes,
    ...depositRoutes
]);