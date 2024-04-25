// Imports from server files
const generateResponse = require("./generateResponse");


const invalidArgumentsResponse = function (req, res, arguments) {
    res.status(400);

    return generateResponse(
        true,
        "Some or all the arguments may have not been valid",
        400,
        { ...arguments }
    );
}

module.exports = invalidArgumentsResponse;