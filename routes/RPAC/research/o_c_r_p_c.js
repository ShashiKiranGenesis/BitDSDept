// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for OCRPC table operations
const getOCRPCByVtuIdAndYear = require("./../../../database/tables/o_c_r_p_c/getOCRPCByVTUIDandYear");
const deleteOCRPCById = require("./../../../database/tables/o_c_r_p_c/deleteOCRPCById");
const insertSingleOCRPC = require("./../../../database/tables/o_c_r_p_c/insertSingleOCRPC");
const insertMultipleOCRPC = require("./../../../database/tables/o_c_r_p_c/insertMultipleOCRPC");
const getOCRPCById = require("./../../../database/tables/o_c_r_p_c/getOCRPCById");

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

    // GET rpac/research/ocrpc/:vtu_id
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
            result = await getOCRPCByVtuIdAndYear(arguments);

        res.send(result);
    })

    // POST rpac/research/ocrpc/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            date_of_event = "not-entered",
            duration = "not-entered",
            title = "not-entered",
            description = "not-entered",
            agency = "not-entered",
            status = "not-entered",
            grant_recieved = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, date_of_event, duration, title, description, agency, status, grant_recieved, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleOCRPC(arguments);

        res.send(result);
    })

    // DELETE rpac/research/ocrpc/id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteOCRPCById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getOCRPCById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete This record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteOCRPCById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST rpac/research/ocrpc/m/:vtu_id
router.post("/m/:vtu_id", async function (req, res) {
    const rows = req.body;
    const { vtu_id = "not-entered" } = req.params;
    const {
        vtu_id: userId = "not-entered"
    } = req.session;

    let result, arguments;

    arguments = { vtu_id };

    if (vtu_id !== userId && !isAuthorized(req, 5))
        result = notAuthorizedResponse(req, res);

    else if (!validateArguments(...Object.values(arguments)))
        result = invalidArgumentsResponse(req, res, arguments);

    else
        result = await insertMultipleOCRPC(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;