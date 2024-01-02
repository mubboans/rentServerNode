const apiErrorHandlerClass = require("../error/errorHandler")

const fnPost = async (model, obj, next) => {
    try {
        let data = await model.create(obj);
        console.log('data created');
        return data;
    }
    catch (e) {
        return next(apiErrorHandlerClass.BadRequest(e?.message));
    }
}
module.exports = fnPost 