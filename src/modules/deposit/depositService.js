
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { successNotiMessage } from "../../helpers/handler";

export const depositService = {
    store: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        return successNotiMessage(dispatch, result);
    },
}