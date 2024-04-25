//Imports from node modules
const express = require("express");


// Imports from server files
const isAuthorized = require("../helpers/authorization/isAuthorised");
const getUserLevel = require("./../helpers/authorization/getUserLevel");

const assignDesignationByVtuId = require("../database/connector tables/employee_designation/assignDesignationByVtuId");
const getAllEmployeeDetails = require("../database/tables/employees/getAllEmployeeDetails");
const getEmpDetailsByVtuId = require("./../database/tables/employees/getEmpDetailsByVtuId");
const handleEditEmployee = require("../handlers/employee/handleEditEmployee");
const registerEmployee = require("../database/tables/employees/registerEmployee");

const defaultResponse = require("../helpers/response/defaultResponse");
const invalidArgumentsResponse = require("./../helpers/response/invalidArgumentsResponse");
const notAuthorizedResponse = require("../helpers/response/notAuthorizedResponse");
const validArguments = require("../helpers/validation/validateArguments");


//Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });


///////////////////////////////////////////////////////////////////////////////
//////////////////////////////All the  Routes//////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// All the routes under this will require level 0 authentication to access 
router.use("/", function (req, res, next) {
    if (!isAuthorized(req, 0)) {
        res.send(notAuthorizedResponse(req, res));
    } else {
        next();
    }
});

// -------------------------------User Routes----------------------------------

router.route("/")
    // This route allows us to get details of all the existing employees
    .get(async function (req, res) {
        const { vtu_id: userId, level } = req.session;
        let result;

        if (!isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else {
            result = await getAllEmployeeDetails({ userId, level });
        }

        res.send(result);
    })

    // This route allows us to register a user into the system
    .post(async function (req, res) {
        const {
            vtu_id = "not-entered",
            full_name = "not-entered",
            father_name = "not-entered",
            mother_name = "not-entered",
            mobile = "not-entered",
            emergency_mobile = "not-entered",
            pad = "not-entered",
            email_address = "not-entered",
            pan_number = "not-entered",
        } = req.body;

        const arguments = {
            vtu_id,
            full_name,
            father_name,
            mother_name,
            mobile,
            emergency_mobile,
            pad,
            email_address,
            pan_number
        };
        let result;

        // Registering a new employee requires user to be of level 5 - Admin
        if (!validArguments(...Object.values(arguments))) {
            result = invalidArgumentsResponse(req, res, arguments);
        } else {
            result = await registerEmployee(arguments)
        }

        res.send(result);
    })


router.route("/:vtu_id")
    // This route will allow us to get details of a single employee
    .get(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const { vtu_id: userId = "not-entered", level = "not-entered" } = req.session;

        const arguments = { vtu_id };
        let result;

        // This operation requires the user to be either of level more than 4 or to be the same employee
        if (!(vtu_id === userId || level >= 4)) {
            result = notAuthorizedResponse(req, res);
        } else if (!validArguments(...Object.values(arguments))) {
            result = invalidArgumentsResponse(req, res, arguments);
        } else {
            result = await getEmpDetailsByVtuId(vtu_id);
        }

        res.send(result);
    })

    // This route will allow user to edit personal details
    .patch(async function (req, res) {
        const { vtu_id = "not-entered" } = req.params;
        const { vtu_id: userId = "not-entered", level = "not-entered" } = req.session;

        let result;

        // This operation requires user to be the same employee or of level 4- HOD
        if (!(vtu_id === userId || level >= 5)) {
            result = notAuthorizedResponse(req, res);
        } else {
            result = await handleEditEmployee(req, res);
        }

        res.send(result);

    })


// This route allows us to assign a role to an employee
router.post("/assignDesignation", async function (req, res) {
    let { designation = "not-entered", vtu_id = "not-entered" } = req.body;
    const arguments = { designation, vtu_id };

    let result;

    // This Operation requires user to be of level 5 - Admin
    if (!getUserLevel(req) >= 5) {
        result = notAuthorizedResponse(req, res);
    } else if (!validArguments(...Object.values(arguments))) {
        result = invalidArgumentsResponse(arguments);
    } else {
        result = await assignDesignationByVtuId(vtu_id, designation);
    }

    res.send(result);
});


// ============================================================================


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = router;