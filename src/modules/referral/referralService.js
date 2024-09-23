
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { successNotiMessage } from "../../helpers/handler";
import { index } from "./referralSlice";

export const referralService = {
    levelFourReferralStore: async (dispatch) => {
        const result = await postRequest(`${endpoints.referral}/level-four`, null, dispatch);
        return successNotiMessage(dispatch, result);
    },

    commissionReferralStore: async (dispatch) => {
        const result = await postRequest(`${endpoints.referral}/commission`, null, dispatch);
        return successNotiMessage(dispatch, result);
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        
        if(result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
    },
}