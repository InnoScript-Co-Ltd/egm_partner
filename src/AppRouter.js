import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./modules/auth/authRoutes";
import { bankAccountRoutes } from "./modules/bank/bankAccountRoutes";
import { referralRoutes } from "./modules/referral/referralRoutes";
import { depositRoutes } from "./modules/deposit/depositRoutes";
import { transactionRoutes } from "./modules/transaction/transactionRoutes";
import { dashboardRoutes } from "./modules/dashboard/dashboardRoutes";
import { agentRoutes } from "./modules/agent/agentRoutes";

export const AppRouters = createBrowserRouter([
    ...authRoutes,
    ...dashboardRoutes,
    ...bankAccountRoutes,
    ...referralRoutes,
    ...depositRoutes,
    ...transactionRoutes,
    ...agentRoutes
]);