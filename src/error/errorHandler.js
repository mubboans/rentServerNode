class apiErrorHandlerClass {
    constructor(code, message, success, error, status) {
        this.code = code,
            this.message = message,
            this.success = success,
            this.error = error,
            this.status = status
    }

    static BadRequest(error) {
        return new apiErrorHandlerClass(400, "Bad request", false, error, 'Failed');
    }

    static InternalServerError(error) {
        return new apiErrorHandlerClass(500, "Internal server error", false, error, 'Failed');
    }

    static NotFound(error) {
        return new apiErrorHandlerClass(404, "Record not found", false, error, 'Failed');
    }
    static recordExists(error) {
        return new apiErrorHandlerClass(409, "Record Already Exist", false, error, 'Failed');
    }
    static InvalidToken(error) {
        return new apiErrorHandlerClass(403, "Token is invalid", false, error, 'Failed');
    }
    static Unauthorized(error) {
        return new apiErrorHandlerClass(401, "User failed to authenticate", false, error, 'Failed');
    }
}
module.exports = apiErrorHandlerClass