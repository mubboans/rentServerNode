const CustomError = require("../error/customErrorClass");

const fnFindOneAndUpdate = async (model, _id, obj) => {
    try {
        let response = await model.findByIdAndUpdate({ _id }, obj);
        if (response) {
            return response;
        }
        else {
            throw new CustomError("No Record Found to Update", 404)
        }
    } catch (error) {
        throw new CustomError(error.message, 400)
    }

}
module.exports = fnFindOneAndUpdate