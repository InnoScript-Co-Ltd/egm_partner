
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { successNotiMessage } from "../../helpers/handler";
import { index } from "./referralSlice";

export const referralService = {
    store: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        return successNotiMessage(dispatch, result);
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        
        if(result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
    },
}