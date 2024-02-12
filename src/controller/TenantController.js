const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");
const fnGetAll = require("../DBcomMethod/fnGetAll");
const User = require('../model/User');
const fnUpdate = require("../DBcomMethod/fnUpdate");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch } = require("../utils/FunctionHelper");
const createMailgenBody = require("../utils/createMailTemplate");
const createMail = require("../utils/sendMail");
const { CreateTenantToken } = require("../utils/jwt");
const Tenant = require("../model/Tenenat");


const getTenant = TryCatch(async (req, res, next) => {
    where = {
        ...req.query,
        role: 'tenant',
    }
    const TenantData = await fnGetAll(User, where, {});
    return returnResponse(res, 200, "Fetch All Tenant", TenantData);
})

const postTenant = TryCatch(async (req, res, next) => {
    let body = req.body;
    let { name } = req.query
    console.log(req.user, 'user check');
    const PostTenantUser = await fnPost(User, { name: body.name, email: body.email, contact: body.contact, role: 'tenant', isActive: false });
    const createTenatRecord = await fnPost(Tenant, {
        userDetail: PostTenantUser._id,
        houseDetail: body.houseDetail,
        ouststanding_balance: body.ouststanding_balance,
        createdBy: req.user,
        otherdetail: body.otherdetail,
    })
    let token = CreateTenantToken({ _id: PostTenantUser._id, email: PostTenantUser.email })
    let mailbody = createMailgenBody({
        body: {
            // title: 'Welcome to ApnaRent!',
            title: `Welcome ${body.name} You Have Been Added As a Tenant By ${name}`,
            name: body.name,
            intro: ['Welcome to ApnaRent!', 'We\'re very excited to move forward with you.'],
            action: {
                instructions: 'Please Click Below Button To Configure Your Account',
                button: {
                    color: '#9DBC98',
                    text: 'Confirm your account',
                    link: `${process.env.FRONT_URL}/tenantsignup?token=${token}`
                }
            },
            outro: [' We thank you for choosing us. Need help, or have questions?', 'Just reply to this email, we\'d love to help.'],
        },
    })

    await createMail(mailbody, body.email, "Membership Created");
    return returnResponse(res, 201, "Create New Tenant");
})

const updateTenant = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const updateData = await fnUpdate(User, req.body, { _id });
    return returnResponse(res, 200, "Updated Tenant");
})
const deleteTenant = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(User, req.body);
    return returnResponse(res, 200, "Deleted Tenant");
})

module.exports = {
    getTenant,
    postTenant,
    updateTenant,
    deleteTenant
}