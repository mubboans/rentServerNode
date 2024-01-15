const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");
const fnGetAll = require("../DBcomMethod/fnGetAll");
const Payment = require('../model/Payment');
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch } = require("../utils/FunctionHelper");


const getPayment = TryCatch(async (req, res, next) => {
    const PaymentData = await fnGetAll(Payment, req.query, { isPopulate: true, arr: [[{ path: 'housedetail' }]] });
    return returnResponse(res, 200, "Fetch All Payment", PaymentData,);
})

const postPayment = TryCatch(async (req, res, next) => {
    await fnPost(Payment, req.body);
    return returnResponse(res, 201, "Create New Payment");
})

const updatePayment = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    await fnUpdate(Payment, req.body, { _id });
    return returnResponse(res, 200, "Updated Payment");
})
const deletePayment = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const deleteData = await fnDelete(Payment, { _id });
    return returnResponse(res, 200, "Deleted Payment");
})

module.exports = {
    getPayment,
    postPayment,
    updatePayment,
    deletePayment
}