const generateResponse =
    function (error = true, message = "default-message", statusCode = 500, payload = null) {
        return {
            error,
            message,
            statusCode,
            payload
        }
    }


module.exports = generateResponse;