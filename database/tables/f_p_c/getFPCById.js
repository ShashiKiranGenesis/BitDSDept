// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a full paper in conference by ID
const getFPCByIdQuery = `
    SELECT *
    FROM full_papers_in_conference
    WHERE id = ?;
`;

async function getFPCById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getFPCByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Full paper in conference fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Full paper in conference not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching full paper in conference by ID");

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

module.exports = getFPCById;