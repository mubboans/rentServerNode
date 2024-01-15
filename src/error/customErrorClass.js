class CustomError extends Error {
    constructor(message, code) {
        // this.code = code;
        // this.message = message;
        super(message);
        this.code = code;
    }
}
module.exports = CustomError;