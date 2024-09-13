
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { setErrors, setNotification } from "../../shares/shareSlice";
import { activeIndex, index, show } from "./bankAccountSlice";

export const bankAccountService = {
    store: async (payload, dispatch) => {
        const result = await postRequest(endpoints.bankAccount, payload, dispatch);

        if (result.status === 200) {
            dispatch(setNotification({
                severity: "success",
                summary: "Success",
                detail: result.message
            }));
        }

        return result;
    },

    index: async (dispatch) => {
        const result = await getRequest(endpoints.bankAccount, null, dispatch);
        
        if(result.status === 200) {
            dispatch(setErrors(null));
            dispatch(index(result.data.data ? result.data.data : result.data));
        }
    },

    activeIndex: async (dispatch) => {
        const result = await getRequest(endpoints.bankAccount, {
            filter: "status",
            value: "ACTIVE"
        }, dispatch);

        if(result.status === 200) {
            dispatch(setErrors(null));
            dispatch(activeIndex(result.data.data ? result.data.data : result.data));
        }
        return result;
    },  

    show: async (dispatch, id) => {
        const result = await getRequest(`${endpoints.bankAccount}/${id}`, null, dispatch);

        if(result.status === 200) {
            dispatch(show(result.data));
        }
    },

    update: async (id, payload, dispatch) => {
        const result = await putRequest(`${endpoints.bankAccount}/${id}`, payload, dispatch);
        return result;
    }
}