const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");

const Login = async (req, res, next) => {
    try {
        console.log(req.body, 'req body');
        return returnResponse(res, 200, 'Login Success', req.body)
    } catch (error) {
        console.log(error);
        return next(apiErrorHandlerClass.BadRequest('Please Try Again with valid credentials'));
    }
}

const Register = async (obj) => {
    try {

    } catch (error) {

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