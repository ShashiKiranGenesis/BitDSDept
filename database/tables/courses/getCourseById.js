// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a row from the courses table by ID
const getCourseByIdQuery = `
    SELECT * FROM courses
    WHERE id = ?;
`;

async function getCourseById(id) {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getCourseByIdQuery, [id]);

        if (data.length === 1)
            result = generateResponse(
                false,
                "Course Fetched Successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Course not found",
                404,
                { id }
            );

    } catch (error) {
        console.log("ERROR    Something went Wrong Fetching Course by ID from the courses table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { id }
        );

    } finally {
        return result;
    }
}

module.exports = getCourseById;
