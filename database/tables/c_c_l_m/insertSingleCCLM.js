// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single CCM row
const insertSingleCCMRowQuery = `
    INSERT INTO contribution_to_corporate_management (vtu_id, academic_year_start, academic_year_end, description, api_score)
    VALUES (?, ?, ?, ?, ?);
`;

async function insertSingleCCM(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end,
        description,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end,
        description,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleCCMRowQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            description,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "CCM row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert CCM row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting CCM row");

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

module.exports = insertSingleCCM;
