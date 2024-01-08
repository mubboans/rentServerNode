const apiErrorHandlerClass = require("../error/errorHandler")

const fnGetAll = async (modelname, query = {}) => {
    try {
        console.log('called getAllData', query);
        let data = await modelname.find(query).sort({ createdAt: -1 });
        console.log('called getAllData lnn 7', modelname);
        return data;
    } catch (error) {
        // console.log(error, 'error called');
        throw new apiErrorHandlerClass.InternalServerError(error)
        // return next(apiErrorHandlerClass.InternalServerError(error?.message))
    }
}
module.exports = fnGetAll