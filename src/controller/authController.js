const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const User = require('../model/User');
const moment = require('moment');
const createMailgenBody = require("../utils/createMailTemplate");

const fnPost = require("../DBcomMethod/fnPost");
const getAllData = require("../DBcomMethod/fnGetAll");
const { attachedTokens, TenantTokenValid } = require("../utils/jwt");
const responseCookie = require("../utils/returnCookie");
const { TryCatch } = require("../utils/FunctionHelper");
const fnFindOne = require("../DBcomMethod/fnFindOne");
const fnUpdate = require("../DBcomMethod/fnUpdate");

function checkPassword(first, second) {
    if (first == second) {
        return true;
    }
    else {
        return false;
    }
}
const Login = async (req, res, next) => {
    try {
        let body = req.body;
        const UserObj = await getAllData(User, { email: body.email });
        console.log(UserObj, 'UserObj');
        if (UserObj && UserObj.length > 0) {
            let user = UserObj[0];
            let checkPassworddb = checkPassword(body.password, user.password);
            if (!checkPassworddb) {
                return next(apiErrorHandlerClass.BadRequest('Authentication Failed'))
            }
            if (!user.isActive) {
                return next(apiErrorHandlerClass.NotFound('The Requested Account Has Been Dormant'))
            }
            let data = attachedTokens({ user: user._id });
            responseCookie(res, data.accessToken, moment().add(12, 'hours').toDate())
            return returnResponse(res, 200, 'Login Success', { ...data, role: user.role })
        }
        return next(apiErrorHandlerClass.NotFound('Authentication Failed'));
    } catch (error) {
        console.log(error);

        return next(apiErrorHandlerClass.BadRequest('Please Try Again with valid credentials'));
    }
}

const Register = async (req, res, next) => {
    try {
        let body = req.body;
        console.log('register hit', body);
        const UserObj = await getAllData(User, { email: body.email });
        console.log(UserObj, 'UserObj');
        if (UserObj && UserObj.length > 0) {
            return next(apiErrorHandlerClass.recordExists('Email Already Exists'))
        }
        let createUser = await fnPost(User, body);
        // console.log(createUser);
        // if (createUser && (createUser !== null || createUser !== undefined)) {
        let mailbody = createMailgenBody({
            body: {
                title: 'Welcome to ApnaRent!',
                name: body.name,
                intro: 'Welcome You Have Successfully Register',
                intro: ['Welcome to ApnaRent!', 'We\'re very excited to have you on board.'],
                outro: [' We thank you for choosing us. Need help, or have questions?', 'Just reply to this email, we\'d love to help.'],
            },
        })
        await createMail(mailbody, body.email, "Register Succesfully");
        let data = attachedTokens({ user: createUser._id });
        responseCookie(res, data.accessToken, moment().add(12, 'hours').toDate())
        return returnResponse(res, 201, "Users Register succesfully", { ...data, role: createUser.role });
        // return next(apiErrorHandlerClass.InternalServerError(''))
    } catch (error) {
        console.log(error, 'when creating user');

        return next(apiErrorHandlerClass.BadRequest(error?.message))
    }
}
const ForgotPassword = async (obj) => {
    try {

    } catch (error) {

    }
}
const SendOTP = async (obj) => {
    try {

    } catch (error) {

    }
}
const RegisterTenant = TryCatch(async (req, res, next) => {
    let { token } = req.query;
    console.log(token, 'toekn');
    let checkDetail = await TenantTokenValid(token);
    console.log(checkDetail, 'checkDetail');
    if (checkDetail.detail) {
        let _id = checkDetail.detail._id
        let data_check = await fnFindOne(User, _id);
        // res.send(data_check)
        console.log(data_check);
        if (data_check && data_check.email == req.body.email) {
            await fnUpdate(User, {
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                isActive: true
            }, { _id });
            return returnResponse(res, 200, "Successfully Reset Detail Now You Can Login")
        }
        else {
            next(apiErrorHandlerClass.BadRequest('Detail Not Found'));
        }
    }
    else {
        next(apiErrorHandlerClass.Unauthorized('Token is invalid'));
    }
}
)
module.exports = {
    Login,
    Register,
    ForgotPassword,
    SendOTP,
    RegisterTenant
}