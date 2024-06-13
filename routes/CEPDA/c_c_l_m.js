// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for ccm table operations
const getCCMByVtuIdAndAcademicYear = require("./../../database/tables/c_c_l_m/getCCLMByVTUIDandYear");
const deleteCCMById = require("./../../database/tables/c_c_l_m/deleteCCLMById");
const insertSingleCCM = require("./../../database/tables/c_c_l_m/insertSingleCCLM");
const insertMultipleCCM = require("./../../database/tables/c_c_l_m/insertMultipleCCLM");
const getCCMById = require("./../../database/tables/c_c_l_m/getCCLMById");

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

    // GET /cepda/cclm/:vtu_id
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
            result = await getCCMByVtuIdAndAcademicYear(arguments);

        res.send(result);
    })

    // POST /cepda/cclm/:vtu_id
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
            result = await insertSingleCCM(arguments);

        res.send(result);
    })

    // DELETE /cepda/cclm/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteCCMById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getCCMById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete This record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteCCMById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST /cepda/cclm/m/:vtu_id
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
        result = await insertMultipleCCM(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
