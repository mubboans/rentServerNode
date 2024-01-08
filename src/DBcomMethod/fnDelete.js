const apiErrorHandlerClass = require("../error/errorHandler")
const fnDelete = async (model, id) => {
    try {
        let data = await model.deleteOne(id);
        if (data[0] == 1) return data;
        else {

            throw new Error("No Record Found");
        }
    }
    catch (e) {
        console.log(e, 'error check');

    }
}
module.exports = fnDelete 