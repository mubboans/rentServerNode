const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler")

const fnFindOne = async (modelname, id) => {
    try {
        let data = await modelname.findById(id)
        return data;
    } catch (error) {
        console.log(error);
        // console.log(error, 'error called');
        throw new CustomError(error?.message, 503)
        // return next(apiErrorHandlerClass.InternalServerError(error?.message))
    }
}
module.exports = fnFindOne