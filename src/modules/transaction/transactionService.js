import { endpoints } from "../../constants/endpoints"
import { getRequest, updateRequest } from "../../helpers/api"
import { successNotiMessage } from "../../helpers/handler";
import { setErrors, setNotification } from "../../shares/shareSlice";
import { index } from "./transactionSlice";

export const transactionService = {
    store: async (payload, dispatch) => {
        const result = await updateRequest(endpoints.transaction, payload, dispatch);
        return successNotiMessage(dispatch, result);
    },

    index: async (dispatch, params) => {
        const result = await getRequest(endpoints.transaction, params, dispatch);
        
        if(result.status === 200) {
            dispatch(setNotification(null));
            dispatch(setErrors(null));
            dispatch(index(result.data.data ? result.data.data : result.data));
        }

        return result;
    }
}