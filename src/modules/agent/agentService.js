import { endpoints } from "../../constants/endpoints"
import { getRequest } from "../../helpers/api"
import { setErrors, setNotification } from "../../shares/shareSlice";
import { index } from "./agentSlice";

export const agentService = {
    index: async (params, dispatch) => {
        const result = await getRequest(endpoints.agent, params, dispatch);

        if(result.status === 200) {
            dispatch(setNotification(null));
            dispatch(setErrors(null));
            dispatch(index(result.data.data ? result.data.data : result.data));
        }

        return result;
    },

    show: async (id, dispatch) => {
        const result = await getRequest(`${endpoints.agent}/${id}`, null, dispatch);
        if(result.status === 200) {
            dispatch(setNotification(null));
            dispatch(setErrors(null));
        }
        return result;
    }
}