const CustomError = require("./customErrorClass");
const apiError = require("./errorHandler");

function apiErrorHandler(err, req, res, next) {
    console.log('enter in error');
    if (err instanceof apiError) {
        let data = {
            message: err.message,
            success: err.success,
            error: err.error,
            status: err.status
        }
        return res.status(err.code).send(data);
        // console.log('running after the return');
    }
    else if (err instanceof CustomError) {
        console.log(err, 'err');
        return res.status(err.code).send({ message: err.message, success: false, status: 'Failed' });
    }
    else {
        return res.status(500).send({ message: 'Something went wrong', success: false, status: 'Service unreachable' })
    }
}
module.exports = apiErrorHandler