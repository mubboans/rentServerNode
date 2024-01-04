const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const User = require('../model/User');

const createMailgenBody = require("../utils/createMailTemplate");
const createMail = require("../utils/sendMail");
const fnPost = require("../DBcomMethod/fnPost");
const getAllData = require("../DBcomMethod/fnGetAll");
const { attachedTokens } = require("../utils/jwt");
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
        if (UserObj && UserObj.length > 0) {
            let user = UserObj[0];
            let checkPassworddb = checkPassword(body.password, user.password);
            if (!checkPassworddb) {
                return next(apiErrorHandlerClass.BadRequest('Authentication Failed'))
            }
            let data = attachedTokens({ user: user._id });
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

        return returnResponse(res, 201, "Users Register succesfully", {
            ...data,
            role: createUser.role,
        })
        // }
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

module.exports = {
    Login,
    Register,
    ForgotPassword,
    SendOTP
}