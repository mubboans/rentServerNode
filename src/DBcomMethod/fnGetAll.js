const apiErrorHandlerClass = require("../error/errorHandler")

const getAllData = async (modelname, query = {}) => {
    try {
        console.log('called getAllData', query);
        let data = await modelname.find(query).sort({ createdAt: -1 });
        console.log('called getAllData lnn 7');
        return data;
    } catch (error) {
        // console.log(error, 'error called');
        throw new Error(error)
        // return next(apiErrorHandlerClass.InternalServerError(error?.message))
    }
}
module.exports = getAllData