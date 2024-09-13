
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { successNotiMessage } from "../../helpers/handler";

export const referralService = {
    store: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        return successNotiMessage(dispatch, result);
    },

    // index: async (dispatch) => {
    //     const result = await getRequest(endpoints.bankAccount, null, dispatch);
        
    //     if(result.status === 200) {
    //         dispatch(index(result.data.data ? result.data.data : result.data));
    //     }
    // },

    // show: async (dispatch, id) => {
    //     const result = await getRequest(`${endpoints.bankAccount}/${id}`, null, dispatch);

    //     if(result.status === 200) {
    //         dispatch(show(result.data));
    //     }
    // },

    // update: async (id, payload, dispatch) => {
    //     const result = await putRequest(`${endpoints.bankAccount}/${id}`, payload, dispatch);
    //     return result;
    // }
}