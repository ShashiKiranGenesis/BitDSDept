// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch all rows from the courses table
const getAllCoursesQuery = `
    SELECT * FROM courses;
`;

async function getAllCourses() {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getAllCoursesQuery);

        result = generateResponse(
            false,
            "Courses Fetched Successfully",
            200,
            data
        );

    } catch (error) {
        console.log("ERROR    Something went Wrong Fetching Courses from the courses table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            []
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = getAllCourses;
