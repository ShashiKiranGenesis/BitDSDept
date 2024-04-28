//Imports from node modules
const express = require("express");


// Imports from server files
const notAuthorizedResponse = require("../helpers/response/notAuthorizedResponse");
const isAuthorized = require("../helpers/authorization/isAuthorised");
const defaultResponse = require("../helpers/response/defaultResponse");

const validateArguments = require("../helpers/validation/validateArguments");
const invalidArguments = require("../helpers/validation/invalidArguments");

const isthRoutes = require("./isth");

//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


///////////////////////////////////////////////////////////////////////////////
/////////////////////////////All the  Routes///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// All work related to Instructor Semeter Teaching Hours Table is directed here
router.use("/isth", isthRoutes);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


module.exports = router;