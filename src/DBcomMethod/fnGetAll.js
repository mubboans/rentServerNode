import apiErrorHandlerClass from "../error/errorHandler";

export const getAllData = async (modelname, query = {}) => {
    try {
        if (query) {

        }
        let data = await modelName.find(query).sort({ createdAt: -1 });
        return data;
    } catch (error) {
        return apiErrorHandlerClass.InternalServerError(error?.message)
    }
}