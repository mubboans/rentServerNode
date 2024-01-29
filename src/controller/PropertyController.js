const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");
const fnGetAll = require("../DBcomMethod/fnGetAll");
const Property = require('../model/Property');
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch } = require("../utils/FunctionHelper");
const fnFindOneAndUpdate = require("../DBcomMethod/fnFindOneAndUpdate");


const getProperty = TryCatch(async (req, res, next) => {
    const PropertyData = await fnGetAll(Property, req.query, {});
    return returnResponse(res, 200, "Fetch All Property", PropertyData,);
})

const postProperty = TryCatch(async (req, res, next) => {
    console.log('property hit');
    await fnPost(Property, req.body);
    return returnResponse(res, 201, "Create New Property/House");
})

const updateProperty = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    await fnFindOneAndUpdate(Property, _id, req.body);
    return returnResponse(res, 200, "Updated Property");
})
const deleteProperty = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const deleteData = await fnDelete(Property, { _id });
    return returnResponse(res, 200, "Deleted Property");
})

module.exports = {
    getProperty,
    postProperty,
    updateProperty,
    deleteProperty
}