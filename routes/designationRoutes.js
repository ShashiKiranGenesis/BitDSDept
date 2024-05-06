//Imports from node modules
const express = require("express");

const validArguments = require("./../helpers/validation/validateArguments");
const isAuthorized = require("../helpers/authorization/isAuthorised");

const generateResponse = require("../helpers/response/generateResponse");
const notAuthorizedResponse = require("./../helpers/response/notAuthorizedResponse");
const invalidArgumentsResponse = require("../helpers/response/invalidArgumentsResponse");

const getAllDesignations = require("../database/tables/designations/getAllDesignations");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
///////////////////////////All the  Routes///////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ENDPOINT("/designations")
// This route will fetch all the available posts in BIT
router.route("/")
    .get(async function (req, res) {
        let result;

        if (!isAuthorized(req, 1))
            result = notAuthorizedResponse(req, res);
        else
            result = await getAllDesignations();

        res.send(result);
    })

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;