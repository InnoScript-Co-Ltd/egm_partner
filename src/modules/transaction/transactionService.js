import { endpoints } from "../../constants/endpoints"
import { updateRequest } from "../../helpers/api"
import { successNotiMessage } from "../../helpers/handler";

export const transactionService = {
    store: async (payload, dispatch) => {
        const result = await updateRequest(endpoints.transaction, payload, dispatch);
        return successNotiMessage(dispatch, result);
    }
}