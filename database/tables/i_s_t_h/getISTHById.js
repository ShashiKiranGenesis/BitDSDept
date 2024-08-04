// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch ISTH row by id
const getISTHByIdQuery = `
    SELECT *
    FROM instructor_semester_teaching_hours
    WHERE id = ?;
`;

async function getISTHById(id) {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getISTHByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "ISTH row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "ISTH row not found",
                404,
                { id }
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ISTH row by ID");

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

module.exports = getISTHById;
