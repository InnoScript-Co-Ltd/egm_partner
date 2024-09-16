import { endpoints } from "../../constants/endpoints"
import { getRequest } from "../../helpers/api"
import { index } from "./depositPackageSlice";

export const depositPackageService = {
    index: async (dispatch) => {
        const result = await getRequest(endpoints.depositPackage, {
            columns: "package_type", 
            search: "PARTNER",
            filter: "status",
            value: "ACTIVE"
        }, dispatch);

        if(result.status === 200) {
            dispatch(index(result.data.data ? result.data.data : result.data));
        }

        return result;
    }
}