import { endpoints } from "../../constants/endpoints"
import { getRequest } from "../../helpers/api"

export const dashboardService = {
    index: async (dispatch) => {
        return await getRequest(endpoints.dashboard, null, dispatch);
    }
}