// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for isth table operations
const getISTHByVTUAndAcademicYear = require("./../../database/tables/i_s_t_h/getISTHByVTUIDandYear");
const deleteISTHById = require("./../../database/tables/i_s_t_h/deleteISTHById");
const insertSingleISTH = require("./../../database/tables/i_s_t_h/insertSingleISTH");
const insertMultipleISTH = require("./../../database/tables/i_s_t_h/insertMultipleISTH");

// Import from Server Files
const validateArguments = require("../../helpers/validation/validateArguments");
const invalidArgumentsResponse = require("../../helpers/response/invalidArgumentsResponse");
const isAuthorized = require("../../helpers/authorization/isAuthorised");
const notAuthorizedResponse = require("../../helpers/response/notAuthorizedResponse");
const getISTHById = require("../../database/tables/i_s_t_h/getISTHById");


// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.route("/:vtu_id")

    // GET /tlea/isth/:vtu_id
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
            result = await getISTHByVTUAndAcademicYear(vtu_id, academic_year_start, academic_year_end);

        res.send(result);
    })

    // POST /tlea/isth/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            course_name = "not-entered",
            semester = "not-entered",
            tce = "not-entered",
            pce = "not-entered"
        } = req.body;
        const {
            academic_year_start = "not-entered",
            academic_year_end = "not-entered",
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleISTH(vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end);

        res.send(result);
    })

    // DELETE /tlea/isth/:id
    .delete(async function (req, res) {
        const { vtu_id: id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteISTHById(id);

        // If not check if user is deleting his own row
        else {
            const rowData = await getISTHById(id);

            if (rowData?.payload?.vtu_id === userId)
                result = await deleteISTHById(id);
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });



// POST /tlea/isth/m
router.post("/m/:vtu_id", async function (req, res) {
    const rows = req.body;
    const { vtu_id = "not-entered" } = req.params;
    const {
        academic_year_start = "not-entered",
        academic_year_end = "not-entered",
        vtu_id: userId = "not-entered"
    } = req.session;

    let result, arguments;

    arguments = { vtu_id, academic_year_end, academic_year_start };

    if (vtu_id !== userId && !isAuthorized(req, 5))
        result = notAuthorizedResponse(req, res);

    else if (!validateArguments(...Object.values(arguments)))
        result = invalidArgumentsResponse(req, res, arguments);

    else
        result = await insertMultipleISTH(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
