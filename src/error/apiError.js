const apiError = require("./errorHandler");

function apiErrorHandler(err, req, res, next) {
    if (err instanceof apiError) {
        let data = {
            message: err.message,
            success: err.success,
            error: err.error,
            status: err.status
        }
        res.status(err.code).send(data)
    }
    else {
        res.status(500).send({ message: 'Something went wrong', success: false, status: 'Service unreachable' })
    }
}
module.exports = apiErrorHandler