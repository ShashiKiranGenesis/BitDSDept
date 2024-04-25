//Imports from node modules
const express = require("express");


// Imports from server files
const invalidArguments = require("./../helpers/validation/invalidArguments");
const validArguments = require("./../helpers/validation/validateArguments");

const loginUser = require("./../helpers/authentication/login");
const logoutUser = require("./../helpers/authentication/logout");

const registerUser = require("./../database/tables/users/registerUser");
const { hashPassword } = require("../helpers/authentication/password");

const defaultResponse = require("./../helpers/response/defaultResponse");
const generateResponse = require("../helpers/response/generateResponse");
const getUserLevel = require("../helpers/authorization/getUserLevel");
const notAuthorizedResponse = require("../helpers/response/notAuthorizedResponse");
const invalidArgumentsResponse = require("../helpers/response/invalidArgumentsResponse");
const isAuthorized = require("../helpers/authorization/isAuthorised");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


/////////////////////////////////////////////////////////////////////////
///////////////////////////All the  Routes///////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ENDPOINT(/auth/register)
// Used to register an existing employee as a user
router.post("/register", async function (req, res) {
    const { vtu_id = "not-entered", password = "not-entered" } = req.body;
    const arguments = { vtu_id, password };
    let result = defaultResponse(arguments);

    // Registering a new user requires current user to be of level 4 - HOD
    // Comment the below block for the initial Registration
    if (getUserLevel(req) < 4) {
        result = notAuthorizedResponse(req, res);
        res.send(result);
        return;
    } 

    if (!validArguments(vtu_id, password)) {
        result = invalidArgumentsResponse(req, res, arguments);
    } else {
        try {
            const hash = await hashPassword(password);
            result = await registerUser(vtu_id, hash);

            if (result.error) res.status(409);
            else res.status(201);

        } catch (error) {
            console.log("ERROR    Something went wrong while registering new user");
            console.log(error.message);

            res.status(500);
            result = generateResponse(
                true,
                error.message,
                error.statusCode,
                arguments
            )
        }
    }

    res.send(result);
});


// ENDPOINT(/auth/login)
// Used to login a user into the website
router.post("/login", async function (req, res) {

    const { vtu_id = "not-entered", password = "not-entered" } = req.body;
    const arguments = { vtu_id, password };
    let result = defaultResponse(arguments);

    if (!validArguments(...Object.values(arguments))) {
        result = invalidArgumentsResponse(req, res, arguments);
    } else {

        try {
            result = await loginUser(req, res, vtu_id, password);
        } catch (error) {
            console.log("Something went wrong while logging in User");
            console.log(error.message);

            res.status(500);
            result = generateResponse(
                true,
                error.message,
                500,
                arguments
            );
        }
    }
    
    res.send(result);
});


// ENDPOINT(/auth/logout)
// Used to Log out a user from the website
router.get("/logout", function (req, res) {
    if (!isAuthorized(req, 0)) {
        res.send(notAuthorizedResponse(req, res));
    } else {
        const result = logoutUser(req, res);
        res.send(result);
    }
});


//ENDPOINT(/auth/secret)
// Used to see if authentication in working fine
router.use("/secret", function (req, res) {
    if (isAuthorized(req, 0)) {
        res.send(generateResponse(
            false,
            "User is currently Logged in!!",
            200,
            { vtu_id: req.session.vtu_id, level: req.session.level }
        ))
    } else {
        res.send(notAuthorizedResponse(req, res));
    }
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;