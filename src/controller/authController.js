const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const User = require('../model/User');

const createMailgenBody = require("../utils/createMailTemplate");
const createMail = require("../utils/sendMail");
const fnPost = require("../DBcomMethod/fnPost");
const getAllData = require("../DBcomMethod/fnGetAll");
const Login = async (req, res, next) => {
    try {
        console.log(req.body, 'req body');
        return returnResponse(res, 200, 'Login Success', req.body)
    } catch (error) {
        console.log(error);
        return next(apiErrorHandlerClass.BadRequest('Please Try Again with valid credentials'));
    }
}

const Register = async (req, res, next) => {
    try {
        let body = req.body;
        console.log('register hit', body);
        const UserObj = await getAllData(User, { email: body.email }, next);
        console.log(UserObj, 'UserObj');
        if (UserObj && UserObj.length > 0) {
            return next(apiErrorHandlerClass.recordExists('Email Already Exists'))
        }
        let createUser = await fnPost(User, body, next);
        console.log(createUser);
        if (createUser && (createUser !== null || createUser !== undefined)) {
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
            return returnResponse(res, 201, "Users Register succesfully")
        }
        return next()
    } catch (error) {
        console.log(error, 'when creating user');
        return next(apiErrorHandlerClass.InternalServerError(error?.message))
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