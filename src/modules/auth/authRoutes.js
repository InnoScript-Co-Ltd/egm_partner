import { Login } from "./entry/Login";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { paths } from "../../constants/paths";
import { AccountProfile } from "./view/AccountProfile";

export const authRoutes = [
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFoundPage />
    },
    {
        path: paths.profile,
        element: <AccountProfile />
    }
];