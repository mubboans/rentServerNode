const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler")

const fnGetAll = async (modelname, query = {}, populateObj = {}) => {
    try {
        console.log('called getAllData', query);
        let data;
        if (populateObj.isPopulate) {
            data = await modelname.find(query).sort({ createdAt: -1 }).populate(populateObj.arr);
        }
        else {
            data = await modelname.find(query).sort({ createdAt: -1 });
        }
        return data;
    } catch (error) {
        // console.log(error, 'error called');
        throw new CustomError(error?.message, 500)
        // return next(apiErrorHandlerClass.InternalServerError(error?.message))
    }
}
module.exports = fnGetAll