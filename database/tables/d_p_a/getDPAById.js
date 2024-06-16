// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a development programme attended row by ID
const getDPAByIdQuery = `
    SELECT *
    FROM development_programme_attended
    WHERE id = ?;
`;

async function getDPAById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getDPAByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Development programme attended row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Development programme attended row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching development programme attended row by ID");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = getDPAById;