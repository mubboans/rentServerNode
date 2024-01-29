const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");

const fnGetAll = require("../DBcomMethod/fnGetAll");
const Category = require("../model/Category");
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch } = require("../utils/FunctionHelper");


const getCategory = TryCatch(async (req, res, next) => {
    const CategoryData = await fnGetAll(Category, req.query, {});
    return returnResponse(res, 200, "Fetch All Category", CategoryData,);
})

const postCategory = TryCatch(async (req, res, next) => {
    const PostedData = await fnPost(Category, req.body);
    return returnResponse(res, 201, "Create New Category");
})

const updateCategory = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const updateData = await fnUpdate(Category, req.body, { _id });
    return returnResponse(res, 200, "Updated Category");
})
const deleteCategory = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(Category, req.query);
    return returnResponse(res, 200, "Deleted Category");
})

module.exports = {
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
}