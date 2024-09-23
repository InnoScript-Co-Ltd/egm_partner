import { removeAllData } from "../libs/localstorage";
import { setErrors, setNotification } from "../shares/shareSlice";
import { paths } from "../constants/paths";
/**
 * Payload handler for update state
 * @param {*} payload
 * @param {*} value
 * @param {*} field
 * @param {*} fn
 */
export const payloadHandler = (payload, value, field, fn) => {
    let updatePayload = { ...payload };
    updatePayload[field] = value;
    fn(updatePayload);
};

/** 
 * Response Hander 
 * @param {*} response
 * */
export const httpResponseHandler = async (response, dispatch) => {
    await dispatch(setErrors(null));
    await dispatch(setNotification(null));

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data.data,
            message: response.data.message
        };
    }
}

/** 
 * Http Response Hander 
 * @param {*} httpResponse
 * @param {*} dispatch
 * */
export const httpErrorHandler = async (httpResponse, dispatch) => {
    await dispatch(setErrors(null));
    await dispatch(setNotification(null));

    if(httpResponse.code === "ERR_NETWORK") {
        await dispatch(setNotification({
            severity: "warn",
            summary: "Network Error",
            detail: "Please check your internet connection!"
        }));

        return {
            status: 0,
            data: null,
            message: "Please check yout internet connection!"
        }
    }

    if(httpResponse.response) {
        const {status, statusText, data } = httpResponse.response;

        if(status === 400 || status === 404 || status === 403 || status === 500) {
            dispatch(setNotification({
                severity: "warn",
                summary: statusText,
                detail: data.message
            }));

            return httpResponse;
        }

        if(status === 401) {
            removeAllData();
            window.location.replace(paths.login);
            return httpResponse;
        }
    }

    return httpResponse;
}   

/**
 * 
 * @param {*} dispatch 
 * @param {*} result 
 * @returns 
 */
export const successNotiMessage = (dispatch, result) => {
    if (result.status === 200) {
        dispatch(setNotification({
            severity: "success",
            summary: "Success",
            detail: result.message
        }));
        dispatch(setErrors(null));
    }
    return result;
}