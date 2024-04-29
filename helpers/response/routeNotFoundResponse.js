const generateResponse = require("./generateResponse");

function routeNotFoundResponse(req, res) {
    res?.status(404);

    return generateResponse(
        true,
        "The Endpoint you are trying to request is not valid, Please check again before requesting",
        404,
        {
            url: req?.url,
            method: req?.method
        }
    );
}

module.exports = routeNotFoundResponse;