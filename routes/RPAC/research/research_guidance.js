// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for research_guidance table operations
const getRGByVtuIdAndAcademicYear = require("./../../../database/tables/research_guidance/getRGByVtuIdAndYear");
const deleteRGById = require("./../../../database/tables/research_guidance/deleteRGById");
const insertSingleRG = require("./../../../database/tables/research_guidance/insertSingleRG");
const insertMultipleRG = require("./../../../database/tables/research_guidance/insertMultipleRG");
const getRGById = require("./../../../database/tables/research_guidance/getRGById");

// Import from Server Files
const validateArguments = require("./../../../helpers/validation/validateArguments");
const invalidArgumentsResponse = require("./../../../helpers/response/invalidArgumentsResponse");
const isAuthorized = require("./../../../helpers/authorization/isAuthorised");
const notAuthorizedResponse = require("./../../../helpers/response/notAuthorizedResponse");
const generateResponse = require("./../../../helpers/response/generateResponse");

// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // GET /research_guidance/:vtu_id
    .get(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, academic_year_start, academic_year_end };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await getRGByVtuIdAndAcademicYear(arguments);

        res.send(result);
    })

    // POST /research_guidance/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            course_type = "not-entered",
            enrolled = "not-entered",
            thesis_submitted = "not-entered",
            degree_awarded = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, course_type, enrolled, thesis_submitted, degree_awarded, academic_year_start, academic_year_end, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleRG(arguments);

        res.send(result);
    })

    // DELETE /research_guidance/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteRGById({ id });

        // If not, check if the user is deleting his own row
        else {
            const rowData = await getRGById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete this record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteRGById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Insert Multiple Route /////////////////////
/////////////////////////////////////////////////////////////////////////

router.post("/m/:vtu_id", async function (req, res) {
    const rows = req.body;
    const { vtu_id = "not-entered" } = req.params;
    const {
        academic_year_start = "not-entered",
        academic_year_end = "not-entered",
        vtu_id: userId = "not-entered"
    } = req.session;

    let result, arguments;

    arguments = { vtu_id, academic_year_start, academic_year_end };

    if (vtu_id !== userId && !isAuthorized(req, 5))
        result = notAuthorizedResponse(req, res);
    else if (!validateArguments(...Object.values(arguments)))
        result = invalidArgumentsResponse(req, res, arguments);
    else
        result = await insertMultipleRG(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;