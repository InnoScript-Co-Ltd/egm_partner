
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest, updateRequest } from "../../helpers/api";
import { successNotiMessage } from "../../helpers/handler";
import { setProfile, update } from "./authSlice";

export const authService = {
    login: async (payload, dispatch) => {
        const result = await postRequest(endpoints.login, payload, dispatch);
        if (result.status === 200) {
            dispatch(update(result.data));
        }
        return successNotiMessage(dispatch, result);
    },

    profile: async (dispatch) => {
        const result = await getRequest(endpoints.profile, null, dispatch);
        if (result.status === 200) {
            dispatch(setProfile(result.data));
        }
    },

    updatePersonalInfo: async (payload, dispatch) => {
        const result = await putRequest(endpoints.accountInfo, payload, dispatch);
        if (result.status === 200) {
            dispatch(setProfile(result.data));
        }
        return successNotiMessage(dispatch, result);
    },

    updateAccount: async (payload, dispatch) => {
        const result = await putRequest(endpoints.account, payload, dispatch);
        if (result.status === 200) {
            dispatch(setProfile(result.data));
        }
        return successNotiMessage(dispatch, result);
    },

    kycUpdate: async (payload, dispatch) => {
        const result = await updateRequest(endpoints.accountKYC, payload, dispatch);
        if (result.status === 200) {
            dispatch(setProfile(result.data));
        }
        return successNotiMessage(dispatch, result);
    },

    changePassword : async (payload, dispatch) => {
        const result = await postRequest(endpoints.changePassword, payload, dispatch);
        return successNotiMessage(dispatch, result);
    },

    setPaymentPassword : async (payload, dispatch) => {
        const result = await postRequest(endpoints.paymentPassword, payload, dispatch);
        return successNotiMessage(dispatch, result);
    }
}