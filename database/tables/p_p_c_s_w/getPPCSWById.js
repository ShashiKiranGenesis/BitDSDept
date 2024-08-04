// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a papers presented row by ID
const getPPCSWByIdQuery = `
    SELECT *
    FROM papers_presented_conference_seminar_workshop
    WHERE id = ?;
`;

async function getPPCSWById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getPPCSWByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Paper presented row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Paper presented row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching paper presented row by ID");

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

module.exports = getPPCSWById;