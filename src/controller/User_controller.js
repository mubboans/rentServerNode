const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");

const fnGetAll = require("../DBcomMethod/fnGetAll");
const User = require("../model/User");
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch } = require("../utils/FunctionHelper");


const getUserDetail = TryCatch(async (req, res, next) => {
    const UserData = await fnGetAll(User, req.query, {});
    return returnResponse(res, 200, "Fetch User Detail", UserData,);
})

const getUserStatus = TryCatch(async (req, res, next) => {
    await fnGetAll(User, req.query, {});
    return returnResponse(res, 200, "Fetch User Status");
})

// const postUser = TryCatch(async (req, res, next) => {
//     const PostedData = await fnPost(User, req.body);
//     return returnResponse(res, 201, "Create New User");
// })

const updateUser = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const updateData = await fnUpdate(User, req.body, { _id });
    return returnResponse(res, 200, "Updated User");
})
const deleteUser = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(User, req.query);
    return returnResponse(res, 200, "Deleted User");
})

module.exports = {
    getUserDetail,
    getUserStatus,
    updateUser,
    deleteUser
}