// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../helpers/authorization/isAuthorised");

// Importing subRoutes
const ecfaRouter = require("./e_c_f_a");
const cclmRouter = require("./c_c_l_m");
const pdaRouter = require("./p_d_a");

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

// Sub-route for 'ecfa' <Extention, Cocurricular and Field Based Activity>
router.use("/ecfa", ecfaRouter);

// Sub-route for 'cclm' <Contribution to Corporate Life and Management>
router.use("/cclm", cclmRouter);

// Sub-route for 'pda' <Professional Development Activity>
router.use("/pda", pdaRouter);



// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
