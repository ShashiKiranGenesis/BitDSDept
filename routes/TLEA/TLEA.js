// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../helpers/authorization/isAuthorised");

// Importing subRoutes
const isthRouter = require("./i_s_t_h");
const arsRouter = require("./a_r_s");
const itreRouter = require("./i_t_r_e");
const examDutiesRouter = require("./exam_duties");

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

// Sub-route for 'isth' <instructor semester teaching hours>
router.use("/isth", isthRouter);

// Sub-route for 'ars' <additional resources to students>
router.use("/ars", arsRouter);

// Sub-route for 'itre' <innovative teaching and resource enhancement>
router.use("/itre", itreRouter);

// Sub-route for 'exam_duties'
router.use("/exam_duties", examDutiesRouter);

// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
