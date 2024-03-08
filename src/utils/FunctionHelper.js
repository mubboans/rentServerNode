const CustomError = require("../error/customErrorClass");
const moment = require("moment")
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
    return moment().format('YYYY MM DD  h:mm:ss a');
}
module.exports = { TryCatch, GetMomentCurrentDate };