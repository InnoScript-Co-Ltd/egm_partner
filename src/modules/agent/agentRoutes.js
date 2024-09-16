import { NotFoundPage } from "../../pages/NotFoundPage";
import { paths } from "../../constants/paths";
import { AgentList } from "./view/AgentList";

export const agentRoutes = [
    {
        path: paths.agent,
        element: <AgentList />,
        errorElement: <NotFoundPage />
    },
];