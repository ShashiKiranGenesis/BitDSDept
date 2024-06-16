// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a programmes invited as guest speaker row by ID
const getPIGSByIdQuery = `
    SELECT *
    FROM programmes_invited_as_guest_speaker
    WHERE id = ?;
`;

async function getPIGSById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getPIGSByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Programmes invited as guest speaker row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Programmes invited as guest speaker row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching programmes invited as guest speaker row by ID");

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

module.exports = getPIGSById;