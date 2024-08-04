// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to Add a row to the courses table
const insertNewCourseQuery = `
    INSERT INTO courses (name, a_level, cpw, lpw, code)
    VALUES (?, ?, ?, ?, ?);
`;

async function addCourse(name, a_level, cpw, lpw, code) {
    let connection;
    let result;
    const arguments = {name, a_level, cpw, lpw, code};

    try {
        connection = await connect();
        const [data] = await connection.query(insertNewCourseQuery, [name, a_level, cpw, lpw, code]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "New Course Added Successfully",
                201,
                { name, a_level, cpw, lpw, code }
            );
        else
            result = generateResponse(
                true,
                "Could not add new Course",
                401,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Adding new Course to the courses table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        return result;
    }
}

module.exports = addCourse;