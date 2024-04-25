// Imports from server files
const generateResponse = require("./generateResponse");


const notAuthorizedResponse = function (req, res, arguments = null) {
    res.status(401);

    return generateResponse(
        true,
        "User Not Authorized to Perform this Action",
        401,
        {
            ...arguments,
            userLevel: req?.session?.level ?? -1,
            userId: req?.session?.vtu_id ?? "Not Logged In"
        }
    );
}


module.exports = notAuthorizedResponse;