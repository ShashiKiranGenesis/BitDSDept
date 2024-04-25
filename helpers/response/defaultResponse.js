const defaultResponse = function (arguments = undefined) {
    return {
        error: true,
        message: "default-message",
        statusCode: 500,
        payload: { ...arguments }
    };
}


module.exports = defaultResponse;