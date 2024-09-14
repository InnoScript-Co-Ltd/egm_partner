import { NotFoundPage } from "../../pages/NotFoundPage";
import { paths } from "../../constants/paths";
import { TransactionList } from "./view/TransactionList";

export const transactionRoutes = [
    {
        path: paths.transaction,
        element: <TransactionList />,
        errorElement: <NotFoundPage />
    },
];