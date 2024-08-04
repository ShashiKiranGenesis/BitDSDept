// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single examination duty row by ID
const getSingleExaminationDutyRowByIdQuery = `
    SELECT *
    FROM examination_duties
    WHERE id = ?;
`;

async function getExaminationDutyById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleExaminationDutyRowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "Examination duty row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "Examination duty row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching examination duty row by ID");

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

module.exports = getExaminationDutyById;
