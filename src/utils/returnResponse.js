const returnResponse = (res, code, message, data = {}) => {
    return res.status(code).send({ message: message, status: code, data, success: true, status: "Success" });
}
module.exports = returnResponse;
