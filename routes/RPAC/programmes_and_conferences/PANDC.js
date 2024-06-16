// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../../helpers/authorization/isAuthorised");

// Importing subRoutes
const dpaRouter = require("./d_p_a");
const pigsRotuer = require("./p_i_g_s");

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

// Sub-route for 'dpa' <Development Program for Students/Faculty Attended>
router.use("/dpa", dpaRouter);

// Sub-route for 'pigs' <Programmes invited to as Guest Speaker>
router.use("/pigs", pigsRotuer);

// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;