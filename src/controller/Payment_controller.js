const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");
const fnGetAll = require("../DBcomMethod/fnGetAll");
const Payment = require('../model/Payment');
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch, GetMomentCurrentDate } = require("../utils/FunctionHelper");
const createMailgenBody = require("../utils/createMailTemplate");
const createMail = require("../utils/sendMail");


const getPayment = TryCatch(async (req, res, next) => {
    let d;
    if (req.user.role == 'admin') {
        d = {
            ...req.query
        }
    }
    else {
        d = {
            ...req.query,
        }
    }
    const PaymentData = await fnGetAll(Payment, d, { isPopulate: true, arr: ['tenantdetail', 'housedetail'] });
    return returnResponse(res, 200, "Fetch All Payment", PaymentData,);
})

const postPayment = TryCatch(async (req, res, next) => {
    let body = req.body;
    let data = await fnPost(Payment, { ...req.body, createdBy: req.user.id });

    let mailbody = createMailgenBody({
        body: {
            title: `Payment Receive ! ${body.amount} via ${body.mode} on ${body.collectedOn}`,
            name: body.tenantname,
            intro: [`Your Payment id is ${data._id}`, 'Any problem please let us know ', `Payment was succesfully receive to ${body.username} via ${body.mode} for ${body.type} `],
            outro: [' We thank you for choosing us.', 'Please reply in case of help your feedback matters'],
        },
    })
    await createMail(mailbody, body.email, "Payment Receive");
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