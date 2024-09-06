import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./modules/auth/authRoutes";

export const AppRouters = createBrowserRouter([
    ...authRoutes,
]);