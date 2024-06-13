// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for PDA table operations
const getPDAByVtuIdAndDateRange = require("./../../database/tables/p_d_a/getPDAByVTUIDandYear");
const deletePDAById = require("./../../database/tables/p_d_a/deletePDAById");
const insertSinglePDA = require("./../../database/tables/p_d_a/insertSinglePDA");
const insertMultiplePDA = require("./../../database/tables/p_d_a/insertMultiplePDA");
const getPDAById = require("./../../database/tables/p_d_a/getPDAById");

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

    // GET /profesional_development_activity/:vtu_id
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
            result = await getPDAByVtuIdAndDateRange(arguments);

        res.send(result);
    })

    // POST /profesional_development_activity/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            date_of_event = "not-entered",
            description = "not-entered",
            organizing_community = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, date_of_event, description, organizing_community, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSinglePDA(arguments);

        res.send(result);
    })

    // DELETE /profesional_development_activity/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deletePDAById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getPDAById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete This record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deletePDAById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST /profesional_development_activity/m/:vtu_id
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
        result = await insertMultiplePDA(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;