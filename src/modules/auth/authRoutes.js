import { Login } from "./entry/Login";
import { NotFoundPage } from "../../pages/NotFoundPage";

export const authRoutes = [
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFoundPage />
    }
];