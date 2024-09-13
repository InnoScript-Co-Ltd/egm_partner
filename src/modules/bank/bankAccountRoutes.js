import { NotFoundPage } from "../../pages/NotFoundPage";
import { paths } from "../../constants/paths";
import { BankAccountList } from "./view/BankAccountList";
import { UpdateBankAccount } from "./entry/UpdateBankAccount";

export const bankAccountRoutes = [
    {
        path: paths.bank,
        element: <BankAccountList />,
        errorElement: <NotFoundPage />
    },
    {
        path: `${paths.bank}/:id`,
        element: <UpdateBankAccount />,
        errorElement: <NotFoundPage />
    }
];