//Imports from node modules
const express = require("express");


// Imports from server files
const notAuthorizedResponse = require("../helpers/response/notAuthorizedResponse");
const isAuthorized = require("../helpers/authorization/isAuthorised");

const validateArguments = require("../helpers/validation/validateArguments");
const invalidArguments = require("../helpers/validation/invalidArguments");
const handleGetDetailsByVtuIdAndYear = require("../../handlers/TLEA/ISTH/handleGetDetailsByVtuIdAndYear");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////All the  Routes///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // ENDPOINT(/tlea/isth/:vtu_id)
    // This Route will fetch all the Information of one employee's isth details of metioned year
    .get(async function (req, res) {
        // This Route Requires the particular employee to be signed in and to also 
        // include 'year' in the query.

        const { year: academic_year_start = "not-entered" } = req.query;
        const { vtu_id = "not-entered" } = req.params;
        const { vtu_id: userId } = req.session;

        const arguments = {
            academic_year_start,
            vtu_id,
            userId
        };
        let result;

        // The employee can fetch his own details or the hod can access anyone's details
        if (vtu_id != userId && !isAuthorized(req, 4))
            result = notAuthorizedResponse(req, res, arguments);
        
        else if (validateArguments(...Object.values(arguments)))
            result = invalidArguments(req, res, arguments);
        
        else
            result = handleGetDetailsByVtuIdAndYear(vtu_id, academic_year_start);


        res.send(result);
    })


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


module.exports = router;