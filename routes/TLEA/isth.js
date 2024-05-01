//Imports from node modules
const express = require("express");


// Imports from server files
const notAuthorizedResponse = require("./../../helpers/response/notAuthorizedResponse");
const isAuthorized = require("./../../helpers/authorization/isAuthorised");

const validateArguments = require("./../../helpers/validation/validateArguments");
const handleGetDetailsByVtuIdAndYear = require("../../handlers/TLEA/ISTH/handleGetDetailsByVtuIdAndYear");
const invalidArgumentsResponse = require("../../helpers/response/invalidArgumentsResponse");
const handleInsertOneISTHRow = require("../../handlers/TLEA/ISTH/handleEnterISTHDetails");
const deleteOneRowById = require("../../database/tables/i_s_t_h/deleteOneRowById");
const getOneRowById = require("../../database/tables/i_s_t_h/getOneRowById");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////All the  Routes///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // ENDPOINT(/tlea/isth/:vtu_id)
    // This Route will fetch all the Information of one employee's isth details of metioned year
    .get(async function (req, res) {
        // This Route Requires the particular employee to be signed in and to also include 'year' in the query.
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
            result = notAuthorizedResponse(req, res);

        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);

        else
            result = await handleGetDetailsByVtuIdAndYear(vtu_id, academic_year_start);


        res.send(result);
    })

    // ENPOINT(/tlea/isth/:vtu_id)
    // This Route will Add single Row to the isth Table
    .post(async function (req, res) {
        const { vtu_id } = req.params;
        const { vtu_id: userId } = req.session;

        // These are the required Fields to perform Transaction
        const {
            course_id = "not-entered",
            semester = "not-entered",
            tce = "not-entered",
            pce = "not-entered",
            startYear: academic_year_start = "not-entered",
            endYear: academic_year_end = "not-entered"
        } = req.body;

        const arguments = {
            vtu_id,
            course_id,
            semester,
            tce,
            pce,
            academic_year_start,
            academic_year_end
        };

        if ((vtu_id !== userId) && !isAuthorized(req, 4))
            result = notAuthorizedResponse(req, res);

        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);

        else
            result = await handleInsertOneISTHRow(arguments);

        res.send(result);
    })

// ENDPOINT(/tlea/isth/:vtu_id)
// This route is used to delete a row from the ISTH table by id
// Expects isth-row-id in params and employee can just delete his own details 
router.delete("/:id", async function (req, res) {
    const { id="not-entered" } = req.params;
    const { vtu_id: userId } = req.session;
    let vtu_id;
    const arguments = { id };

    if (!isAuthorized(req, 1))
        result = notAuthorizedResponse(req, res);

    else if (!validateArguments(...Object.values(arguments)))
        result = invalidArgumentsResponse(req, res, arguments);

    else {
        result = await getOneRowById(id);
        vtu_id = result.payload.vtu_id ;
        
        if(!result.error) {
            if(vtu_id!==userId && !isAuthorized(req, 4))
                result = notAuthorizedResponse(req, res);
            else 
                result = await deleteOneRowById(id);
        }
    }

    res.send(result);
})


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


module.exports = router;