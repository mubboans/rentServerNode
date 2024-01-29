const CustomError = require("../error/customErrorClass");
const apiErrorHandlerClass = require("../error/errorHandler")
const fnDelete = async (model, id) => {
    try {
        let data = await model.deleteOne(id);
        console.log(data, 'delte result');
        if (data.deletedCount == 1) {
            console.log('enter in log 1');
            return true
        }
        else {
            throw new CustomError('No Record Found', 404)
        }
    }
    catch (e) {
        console.log(e, 'error check');
        throw new CustomError(e.message, 404)
    }
}
module.exports = fnDelete 