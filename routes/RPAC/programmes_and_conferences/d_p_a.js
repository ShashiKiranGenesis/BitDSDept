// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for dpa table operations
const getDPAByVtuIdAndYear = require("../../../database/tables/d_p_a/getDPAByVtuIdAndYear");
const deleteDPAById = require("../../../database/tables/d_p_a/deleteDPAById");
const insertSingleDPA = require("../../../database/tables/d_p_a/insertSingleDPA");
const insertMultipleDPA = require("../../../database/tables/d_p_a/insertMultipleDPA");
const getDPAById = require("../../../database/tables/d_p_a/getDPAById");

// Import from Server Files
const validateArguments = require("../../../helpers/validation/validateArguments");
const invalidArgumentsResponse = require("../../../helpers/response/invalidArgumentsResponse");
const isAuthorized = require("../../../helpers/authorization/isAuthorised");
const notAuthorizedResponse = require("../../../helpers/response/notAuthorizedResponse");
const generateResponse = require("../../../helpers/response/generateResponse");

// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // GET /rpac/pandc/dpa/:vtu_id
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
            result = await getDPAByVtuIdAndYear(arguments);

        res.send(result);
    })

    // POST /rpac/pandc/dpa/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            date_of_event = "not-entered",
            description = "not-entered",
            duration = "not-entered",
            organized_by = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, date_of_event, description, duration, organized_by, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleDPA(arguments);

        res.send(result);
    })

    // DELETE /rpac/pandc/dpa/:vtu_id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteDPAById({ id });

        // If not, check if the user is deleting his own row
        else {
            const rowData = await getDPAById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete this record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteDPAById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Insert Multiple Route /////////////////////
/////////////////////////////////////////////////////////////////////////


// POST /rpac/pandc/dpa/m/:vtu_id
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
        result = await insertMultipleDPA(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;