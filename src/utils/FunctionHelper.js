const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler");

const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next)).catch((e) => {
            console.log(e);
            // apiErrorHandlerClass.BadRequest(e)

            next(new CustomError(e?.message, e?.code));
            // next(new Error(e?.message))
        });
    }
}
const GetMomentCurrentDate = () => {
    return moment().format('MMM Do YYYY, h:mm:ss a');
}
module.exports = { TryCatch };