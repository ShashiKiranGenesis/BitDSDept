// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../../helpers/authorization/isAuthorised");

// Importing subRoutes
// const BPRouter = require("./books_published");
const acpRouter = require("./a_c_p");
// const ppjRouter = require("./p_p_j");
const fpcRouter = require("./f_p_c");

// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////


//All the routes under this will require level 1 authentication to access 
router.use("/", function (req, res, next) {
    if (!isAuthorised(req, 1)) {
        res.send(notAuthorizedResponse(req, res));
    } else {
        next();
    }
});

// ------------------------Protected Routes-------------------------------

// Sub-route for 'books published'
// router.use("/books_published", BPRouter);

// Sub-route for 'acp' <Articles or Chapters Published>
router.use("/acp", acpRouter);

// Sub-route for 'fpc' <Full Papers in Conference>
router.use("/fpc", fpcRouter);

// Sub-route for 'ppj' <Published Papers in Journals>
// router.use("/ppj", ppjRouter);

// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;