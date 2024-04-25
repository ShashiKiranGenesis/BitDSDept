// Imports from Server Files
const defaultResponse = require("../response/defaultResponse");
const generateResponse = require("../response/generateResponse");
const notAuthorizedResponse = require("../response/notAuthorizedResponse");


function logoutUser(req, res) {

    let result = generateResponse(
        false,
        "User Successfully Logged Out",
        200,
        null
    );

    res.status(200);

    // Logs out the user
    req.session.vtu_id = undefined;
    req.session.level = undefined;


    return result;

}

module.exports = logoutUser;