// Imports from node modules
const express = require("express");

const validArguments = require("./../helpers/validation/validateArguments");
const isAuthorized = require("../helpers/authorization/isAuthorised");

const generateResponse = require("../helpers/response/generateResponse");
const notAuthorizedResponse = require("./../helpers/response/notAuthorizedResponse");
const invalidArgumentsResponse = require("./../helpers/response/invalidArgumentsResponse");

const getAllCourses = require("../database/tables/courses/getAllCourses");
const getCourseById = require("../database/tables/courses/getCourseById");
const addCourse = require("./../database/tables/courses/addCourse");
const updateCourse = require("./../database/tables/courses/updateCourse");
const deleteCourse = require("./../database/tables/courses/deleteCourse");

// Configuring the Backend middlewares and dependencies
const router = express.Router({ strict: true });

/////////////////////////////////////////////////////////////////////////
/////////////////////////// All the Routes /////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ENDPOINT("/courses")
router.route("/")
    // This route will fetch all the available courses
    .get(async function (req, res) {
        let result;

        if (!isAuthorized(req, 1))
            result = notAuthorizedResponse(req, res);
        else
            result = await getAllCourses();

        res.send(result);
    })

    // This route will allow us to add more courses
    .post(async function (req, res) {
        let result;
        const { 
            name = "not-entered", 
            a_level = "not-entered", 
            cpw = "not-entered", 
            lpw = "not-entered", 
            code = "not-entered" 
        } = req.body;

        const arguments = { name, a_level, cpw, lpw, code };

        // Requires Admin Level Authorization to add new Course
        if (!isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res);
        else
            result = await addCourse(name, a_level, cpw, lpw, code);

        res.send(result);
    });

// ENDPOINT("/courses/:id")
router.route("/:id")
    // This route will fetch a single course by ID
    .get(async function (req, res) {
        let result;
        const { id } = req.params;

        if (!isAuthorized(req, 1))
            result = notAuthorizedResponse(req, res);
        else
            result = await getCourseById(id);

        res.send(result);
    })

    // This route will allow us to update a course by ID
    .patch(async function (req, res) {
        let result;
        const { id } = req.params;
        const { name, a_level, cpw, lpw, code } = req.body;

        const arguments = { name, a_level, cpw, lpw, code };

        // Requires Admin Level Authorization to update a Course
        if (!isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else if (!validArguments(...Object.values(arguments)))
            result = invalidArgumentsResponse(req, res);
        else
            result = await updateCourse(id, name, a_level, cpw, lpw, code);

        res.send(result);
    })

    // This route will allow us to delete a course by ID
    .delete(async function (req, res) {
        let result;
        const { id } = req.params;

        // Requires Admin Level Authorization to delete a Course
        if (!isAuthorized(req, 5))
            result = notAuthorizedResponse(req, res);
        else
            result = await deleteCourse(id);

        res.send(result);
    });

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports = router;