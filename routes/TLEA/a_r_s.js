// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for ars table operations
const getARSByVtuIdAndAcademicYear = require("./../../database/tables/a_r_s/getARSByVTUIDandYear");
const deleteARSById = require("./../../database/tables/a_r_s/deleteARSById");
const insertSingleARS = require("./../../database/tables/a_r_s/insertSingleARS");
const insertMultipleARS = require("./../../database/tables/a_r_s/insertMultipleARS");
const getARSById = require("./../../database/tables/a_r_s/getARSById");

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

    // GET /tlea/ars/:vtu_id
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
            result = await getARSByVtuIdAndAcademicYear(arguments);

        res.send(result);
    })

    // POST /tlea/ars/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            course_name = "not-entered",
            consulted_from = "not-entered",
            prescribed_resources = "not-entered",
            additional_resources_provided = "not-entered"
        } = req.body;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, course_name, consulted_from, prescribed_resources, additional_resources_provided, academic_year_start, academic_year_end };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleARS(arguments);

        res.send(result);
    })

    // DELETE /tlea/ars/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteARSById({ id });

        // If not check if user is deleting his own row
        else {
            const rowData = await getARSById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete This record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteARSById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

// POST /tlea/ars/m/:vtu_id
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
        result = await insertMultipleARS(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
