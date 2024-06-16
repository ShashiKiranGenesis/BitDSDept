// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for programmes_invited_as_guest_speaker table operations
const getPIGSByVtuIdAndYear = require("./../../../database/tables/p_i_g_s/getPIGSByVtuIdAndYear");
const deletePIGSById = require("./../../../database/tables/p_i_g_s/deletePIGSById");
const insertSinglePIGS = require("./../../../database/tables/p_i_g_s/insertSinglePIGS");
const insertMultiplePIGS = require("./../../../database/tables/p_i_g_s/insertMultiplePIGS");
const getPIGSById = require("./../../../database/tables/p_i_g_s/getPIGSById");

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

    // GET /rpac/pandg/pigs/:vtu_id
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
            result = await getPIGSByVtuIdAndYear(arguments);

        res.send(result);
    })

    // POST /rpac/pandg/pigs/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            date_of_event = "not-entered",
            title_of_lecture = "not-entered",
            title_of_conference = "not-entered",
            event_level = "not-entered",
            organized_by = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, date_of_event, title_of_lecture, title_of_conference, event_level, organized_by, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSinglePIGS(arguments);

        res.send(result);
    })

    // DELETE /rpac/pandg/pigs/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deletePIGSById({ id });

        // If not, check if the user is deleting his own row
        else {
            const rowData = await getPIGSById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete this record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deletePIGSById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Insert Multiple Route /////////////////////
/////////////////////////////////////////////////////////////////////////


// POST /rpac/pandg/pigs/m/:VTUID
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
        result = await insertMultiplePIGS(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;