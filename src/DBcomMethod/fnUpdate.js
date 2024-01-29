const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler")

const fnUpdate = async (model, obj, id) => {
    try {

        console.log(obj, id, 'data', model);
        let data = await model.findOneAndUpdate(id, obj);
        console.log(data, 'data');
        return data;
    }
    catch (e) {
        console.log(e, 'error check');
        throw new CustomError(e, 400);
    }
}
module.exports = fnUpdate 