import { NotFoundPage } from "../../pages/NotFoundPage";
import { paths } from "../../constants/paths";
import { ReferralList } from "./view/ReferralList";

export const referralRoutes = [
    {
        path: paths.referral,
        element: <ReferralList />,
        errorElement: <NotFoundPage />
    },
];