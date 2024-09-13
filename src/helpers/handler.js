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
export const httpResponseHandler = (response, dispatch) => {
    if (response.status === 200) {
        dispatch(setErrors(null));

        return {
            status: response.status,
            data: response.data.data,
            message: response.data.message
        };
    }
}

/** 
 * Response Hander 
 * @param {*} errors
 * @param {*} dispatch
 * */
export const httpErrorHandler = async (errors, dispatch) => {

    if (errors && errors.status === 400) {
        await dispatch(setErrors(null));
        await dispatch(setNotification({
            severity: "warn",
            summary: "Bad Request",
            detail: errors.data.message
        }));

        return {
            status: errors.status,
            message: errors.message,
        }
    }

    if (errors && errors.status === 500) {
        await dispatch(setNotification({
            severity: "error",
            summary: "Internal Server Error",
            detail: errors.data.message
        }));

        return {
            status: errors.status,
            message: errors.data.message,
        }
    }

    if (errors && errors.status === 422) {
        await dispatch(setErrors(errors.data.data));

        return {
            status: errors.status,
            message: errors.data.message,
        }
    }

    if (errors && errors.status === 401) {
        removeAllData();
        window.location.replace(paths.login);
    }

    return errors;
}

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