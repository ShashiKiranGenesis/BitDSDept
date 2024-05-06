//Imports from node modules
const express = require("express");

const validArguments = require("./../helpers/validation/validateArguments");
const isAuthorized = require("../helpers/authorization/isAuthorised");

const generateResponse = require("../helpers/response/generateResponse");
const notAuthorizedResponse = require("./../helpers/response/notAuthorizedResponse");
const invalidArgumentsResponse = require("../helpers/response/invalidArgumentsResponse");

const getAllDesignations = require("../database/tables/designations/getAllDesignations");
const addDesignation = require("./../database/tables/designations/addDesignation");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
///////////////////////////All the  Routes///////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ENDPOINT("/designations")
router.route("/")
    // This route will fetch all the available posts in BIT
    .get(async function (req, res) {
        let result;

        if (!isAuthorized(req, 1))
            result = notAuthorizedResponse(req, res);
        else
            result = await getAllDesignations();

        res.send(result);
    })

    // This route will allow us to add more designation in BIT
    .post(async function (req, res) {
        let result;
        const { designation = "not-entered", level = "not-entered" } = req.body;

        const arguments = { designation, level };

        // Requires Admin Level Authorization to add new Designation
        if (!isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res);
        else
            result = await addDesignation(designation, level);

        res.send(result);
    })


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;