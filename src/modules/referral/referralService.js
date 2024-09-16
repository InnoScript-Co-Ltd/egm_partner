
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpErrorHandler, successNotiMessage } from "../../helpers/handler";
import { index } from "./referralSlice";

export const referralService = {
    store: async (dispatch) => {
        const result = await postRequest(endpoints.referral, null, dispatch);
        await httpErrorHandler(result, dispatch);
        return successNotiMessage(dispatch, result);
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        
        if(result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
    },
}