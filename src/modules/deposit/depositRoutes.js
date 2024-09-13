import { paths } from "../../constants/paths";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { DepositList } from "./view/DepositList";

export const depositRoutes = [
    {
        path: paths.deposit,
        element: <DepositList />,
        errorElement: <NotFoundPage />
    },
]