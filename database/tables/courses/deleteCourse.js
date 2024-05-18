// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a row from the courses table by ID
const deleteCourseQuery = `
    DELETE FROM courses
    WHERE id = ?;
`;

async function deleteCourse(id) {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(deleteCourseQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Course Deleted Successfully",
                200,
                { id }
            );
        else
            result = generateResponse(
                true,
                "Course not found or could not be deleted",
                404,
                { id }
            );

    } catch (error) {
        console.log("ERROR    Something went Wrong Deleting Course from the courses table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            {id}
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = deleteCourse;
