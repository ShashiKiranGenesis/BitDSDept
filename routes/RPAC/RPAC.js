// Imports from node modules
const express = require("express");

// Importing Server Files
const notAuthorizedResponse = require("./../../helpers/response/notAuthorizedResponse");
const isAuthorised = require("./../../helpers/authorization/isAuthorised");

// Importing subRoutes
const researchRoutes = require("./research/RESEARCH");

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

// Sub-route for research sub-section of the RPAC
router.use("/research", researchRoutes);




// -----------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;
