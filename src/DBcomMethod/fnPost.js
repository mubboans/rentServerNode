const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler")

const fnPost = async (model, obj) => {
    try {
        console.log(obj, 'body check');
        let data = await model.create(obj);
        console.log('data created');
        return data;
    }
    catch (e) {
        console.log(e, 'error check');
        throw new CustomError(e?.message ? e?.message : "Error in creating record", 400);
    }
}
module.exports = fnPost 