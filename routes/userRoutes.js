//Imports from node modules
const express = require("express");


// Imports from server files
const notAuthorizedResponse = require("../helpers/response/notAuthorizedResponse");
const isAuthorized = require("../helpers/authorization/isAuthorised");
const defaultResponse = require("../helpers/response/defaultResponse");

const validateArguments = require("../helpers/validation/validateArguments");
const invalidArguments = require("../helpers/validation/invalidArguments");

const handleChangePassword = require("../handlers/user/handleChangePassword");
const handleChangePasswordByAdmin = require("../handlers/user/handleChangePasswordByAdmin");
const handleForgetPassword = require("../handlers/user/handleForgetPassword");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////All the  Routes///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// ----------------------------Non-User Routes---------------------------------

// This route allows user to change password, requires pan number for verification
router.post("/forgetpassword", async function (req, res) {
    const {
        vtu_id: userId = "not-entered",
        pan_number = "not-entered",
        password: newPassword = "not-entered"
    } = req.body;

    const arguments = { pan_number, newPassword, userId };
    let result;

    if (!validateArguments(...Object.values(arguments))) {
        result = invalidArguments(arguments);
    } else {
        result = await handleForgetPassword(userId, pan_number, newPassword);
    }

    res.send(result);
});

// ============================================================================

//All the routes under this will require level 0 authentication to access 
router.use("/", function (req, res, next) {
    if (!isAuthorized(req, 0)) {
        res.send(notAuthorizedResponse(req, res));
    } else {
        next();
    }
});

// -------------------------------User Routes----------------------------------


// This route allows user to change their password by verifying their current password
router.post("/changepassword", async function (req, res) {
    const { vtu_id } = req.session;
    let { newPassword = "not-entered", oldPassword = "not-entered" } = req.body;
    
    let result;
    const arguments = { vtu_id, newPassword, oldPassword };

    if (!validateArguments(...Object.values(arguments)))
        result = invalidArguments(arguments);
    else {
        result = await handleChangePassword(vtu_id, oldPassword, newPassword);
    }

    res.send(result);
});


// This route allows to change password, without any verification - Admin Route
router.post("/overridepassword", async function (req, res) {
    let { vtu_id = "not-entered", password = "not-entered" } = req.body;
    const { vtu_id: userId = "not-entered", level = "not-entered" } = req.session;
    
    let result;
    const arguments = { vtu_id, password, userId, level };

    // Overriding password can only be done by user of level 5 - admin
    if (!isAuthorized(req, 5)) {
        result = notAuthorizedResponse(req, res);
    } else if (!validateArguments(...Object.values(arguments))) {
        result = invalidArguments(arguments);
    } else {
        result = await handleChangePasswordByAdmin(vtu_id, password);
    }

    res.send(result);
});


// ============================================================================


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


module.exports = router;