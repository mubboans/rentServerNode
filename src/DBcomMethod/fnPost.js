const apiErrorHandlerClass = require("../error/errorHandler")

const fnPost = async (model, obj) => {
    try {
        let data = await model.create(obj);
        console.log('data created');
        return data;
    }
    catch (e) {
        console.log(e, 'error check');
        throw new Error(e);
    }
}
module.exports = fnPost 