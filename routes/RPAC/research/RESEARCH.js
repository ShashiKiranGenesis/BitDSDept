// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../../helpers/authorization/isAuthorised");

// Importing subRoutes
const ocrpcRouter = require("./o_c_r_p_c");

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

// Sub-route for 'ocrpc' <On-Going Research Projects and Consultancies>
router.use("/ocrpc", ocrpcRouter);



// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
