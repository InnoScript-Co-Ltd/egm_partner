
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler, successNotiMessage } from "../../helpers/handler";

export const depositService = {
    store: async (dispatch) => {
        const result = await getRequest(endpoints.referral, null, dispatch);
        console.log(result);
        await httpServiceHandler(dispatch, result);

        if(result.status === 200) {
            successNotiMessage(dispatch, result);
        }
        
        return result;
    },
}