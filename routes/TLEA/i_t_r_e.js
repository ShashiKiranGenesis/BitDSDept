// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for itre table operations
const getITREByVtuIdAndAcademicYear = require("./../../database/tables/i_t_r_e/getITREByVTUidAndYear");
const deleteITREById = require("./../../database/tables/i_t_r_e/deleteITREById");
const insertSingleITRE = require("./../../database/tables/i_t_r_e/insertSingleITRE");
const insertMultipleITRE = require("./../../database/tables/i_t_r_e/insertMultipleITRE");
const getITREById = require("./../../database/tables/i_t_r_e/getITREById");

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

    // GET /tlea/itre/:vtu_id
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
            result = await getITREByVtuIdAndAcademicYear(arguments);

        res.send(result);
    })

    // POST /tlea/itre/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            description = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, description, api_score, academic_year_start, academic_year_end };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleITRE(arguments);

        res.send(result);
    })

    // DELETE /tlea/itre/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteITREById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getITREById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete this record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteITREById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST /tlea/itre/m/:vtu_id
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
        result = await insertMultipleITRE(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;

