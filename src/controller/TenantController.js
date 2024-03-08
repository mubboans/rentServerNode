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
const { CreateTenantToken, attachedTokens } = require("../utils/jwt");
const Tenant = require("../model/Tenant");
const TenantUser = require("../model/TenantUser");
const fnFindOne = require("../DBcomMethod/fnFindOne");


const getTenant = TryCatch(async (req, res, next) => {
    let d;
    if (req.user.role == 'admin') {
        d = {
            ...req.query,
        }
    }
    else {
        d = {
            ...req.query,
            createdBy: req.user.id,
        }
    }
    console.log(d, 'where in tenant');
    const TenantData = await fnGetAll(Tenant, d, { isPopulate: true, arr: ['userDetail', 'houseDetail'] });
    return returnResponse(res, 200, "Fetch All Tenant", TenantData);
})

const postTenant = TryCatch(async (req, res, next) => {
    let body = req.body;
    const createTenatRecord = await fnPost(Tenant, {
        ...body,
        createdBy: req.user.id,
    })

    return returnResponse(res, 201, "Create New Tenant");
})

const updateTenant = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const updateData = await fnUpdate(Tenant, req.body, { _id });
    return returnResponse(res, 200, "Updated Tenant");
})
const deleteTenant = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(Tenant, req.body);
    return returnResponse(res, 200, "Deleted Tenant");
})


const getTenantUser = TryCatch(async (req, res, next) => {

    let d;
    if (req.user.role == 'admin') {
        d = {
            ...req.query,
        }
    }
    else {
        d = {
            ...req.query,
            createdBy: req.user.id,
        }
    }
    const UserData = await fnGetAll(TenantUser, d, {});
    return returnResponse(res, 200, "Fetch Tenant User Detail", UserData,);
})


const postTenantUser = TryCatch(async (req, res, next) => {
    let body = req.body;
    let { name } = req.query;
    const PostedData = fnPost(TenantUser, { ...req.body, createdBy: req.user.id });
    let token = CreateTenantToken({ _id: PostedData._id, email: PostedData.email })
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
    return returnResponse(res, 201, "Create New Tenant User");
})

const updateTenantUser = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }

    const updateData = await fnUpdate(TenantUser, req.body, { _id });
    return returnResponse(res, 200, "Updated Tenant User");
})
const deleteTenantUser = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(TenantUser, req.query);
    return returnResponse(res, 200, "Deleted Tenant User");
})

const TenantLogin = TryCatch(async (req, res, next) => {
    let body = req.body;
    let userdata = await fnFindOne(TenantUser, { email: body.email });
    console.log(userdata, 'userdata');
    if (userdata && userdata._id) {
        if (!userdata.isActive) {
            return next(apiErrorHandlerClass.Unauthorized('It seem your account is not active.'));
        }
        if (userdata.password !== body.password) {
            return next(apiErrorHandlerClass.BadRequest('It seem your credential is wrong.'));
        }
        let data = attachedTokens({ id: userdata._id, role: userdata.role });
        return returnResponse(res, 200, 'Login Success', { ...data, role: userdata.role, name: userdata.name })
    }
    else {
        return next(apiErrorHandlerClass.NotFound("Can't found tenant with you credential"))
    }
})

module.exports = {
    getTenant,
    postTenant,
    updateTenant,
    deleteTenant,
    getTenantUser,
    postTenantUser,
    updateTenantUser,
    deleteTenantUser,
    TenantLogin
}