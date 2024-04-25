const CustomError = function (message, errorCode, details) {
    const error = new Error(message);
    error.errno = errorCode;
    error.details = details;

    return error;
}

module.exports = CustomError;