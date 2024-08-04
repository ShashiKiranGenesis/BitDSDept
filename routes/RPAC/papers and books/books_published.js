// Imports from node modules
const express = require("express");

// Importing MySQL transaction files for BP table operations
const getBPByVtuIdAndYear = require("../../../database/tables/books_published/getBPByVTUIDandYear");
const deleteBPById = require("../../../database/tables/books_published/deleteBPById");
const insertSingleBP = require("../../../database/tables/books_published/insertSingleBP");
const insertMultipleBP = require("../../../database/tables/books_published/insertMultipleBP");
const getBPById = require("../../../database/tables/books_published/getBPById");

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

    // GET /BP/:vtu_id
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
            result = await getBPByVtuIdAndYear(arguments);

        res.send(result);
    })

    // POST /BP/:vtu_id
    .post(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const {
            date_of_event = "not-entered",
            title_with_page = "not-entered",
            description = "not-entered",
            ISSN_ISBN = "not-entered",
            peer_review_desc = "not-entered",
            no_of_co_authors = 0,
            main_author = "not-entered",
            api_score = "not-entered"
        } = req.body;
        const {
            vtu_id: userId = "not-entered"
        } = req.session;

        let result, arguments;

        arguments = { vtu_id, date_of_event, title_with_page, description, peer_review_desc, ISSN_ISBN, no_of_co_authors, main_author, api_score };

        if (vtu_id !== userId && !isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validateArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res, arguments);
        else
            result = await insertSingleBP(arguments);

        res.send(result);
    })

    // DELETE /BP/:id
    .delete(async function (req, res) {
        const { vtu_id : id } = req.params;
        const { vtu_id: userId } = req.session;

        let result;

        // If User is Admin Delete Right Away!
        if (isAuthorized(req, 5))
            result = await deleteBPById({ id });

        // If not, check if the user is deleting his own row
        else {
            const rowData = await getBPById({ id });
            if (rowData?.error)
                result = generateResponse(
                    true,
                    "Could not delete this record for some reason, try again later",
                    400,
                    { id }
                );
            else if (rowData?.payload?.vtu_id === userId)
                result = await deleteBPById({ id });
            else
                result = notAuthorizedResponse(req, res);
        }

        res.send(result);
    });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Insert Multiple Route ////////////////////////
/////////////////////////////////////////////////////////////////////////

// POST /BP/m/:vtu_id
router.post("/m/:vtu_id", async function (req, res) {
    const rows = req.body;
    const { vtu_id = "not-entered" } = req.params;
    const { vtu_id: userId } = req.session;

    let result, arguments;

    arguments = { vtu_id };

    if (vtu_id !== userId && !isAuthorized(req, 5))
        result = notAuthorizedResponse(req, res);
    else if (!Array.isArray(rows))
        result = invalidArgumentsResponse(req, res, { rows });
    else
        result = await insertMultipleBP(
            rows.map(row => ({ ...row, ...arguments }))
        );

    res.send(result);
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;