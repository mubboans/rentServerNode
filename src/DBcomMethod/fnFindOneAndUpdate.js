const { TryCatch } = require("../utils/FunctionHelper")

const fnFindOneAndUpdate = TryCatch(async (model, _id, obj) => {
    let response = await model.findByIdAndUpdate({ _id }, obj);
    return response;
})
module.exports = fnFindOneAndUpdate