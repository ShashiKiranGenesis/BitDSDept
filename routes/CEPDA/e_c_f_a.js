// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for ECF table operations
const getECFByVtuIdAndAcademicYear = require("./../../database/tables/e_c_f_a/getECFAByVTUIDandYear");
const deleteECFById = require("./../../database/tables/e_c_f_a/deleteECFAById");
const insertSingleECF = require("./../../database/tables/e_c_f_a/insertSingleECFA");
const insertMultipleECF = require("./../../database/tables/e_c_f_a/insertMultipleECFA");
const getECFById = require("./../../database/tables/e_c_f_a/getECFAById");

// Import from Server Files
const validateArguments = require("../../helpers/validation/validateArguments");
const invalidArgumentsResponse = require("../../helpers/response/invalidArgumentsResponse");
const isAuthorized = require("../../helpers/authorization/isAuthorised");
const notAuthorizedResponse = require("../../helpers/response/notAuthorizedResponse");
const generateResponse = require("../../helpers/response/generateResponse");

// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // GET /ecfa/:vtu_id
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
            result = await getECFByVtuIdAndAcademicYear(arguments);

        res.send(result);
    })

    // POST /ecfa/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            description = "not-entered",
            avg_hours_per_week = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, description, avg_hours_per_week, api_score, academic_year_start, academic_year_end };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleECF(arguments);

        res.send(result);
    })

    // DELETE /ecfa/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteECFById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getECFById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete This record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteECFById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST /ecfa/m/:vtu_id
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
        result = await insertMultipleECF(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;