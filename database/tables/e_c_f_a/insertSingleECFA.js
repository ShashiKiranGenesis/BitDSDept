// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single ECF row
const insertSingleECFRowQuery = `
    INSERT 
    INTO extentions_cocurricular_field_activity (vtu_id, academic_year_start, academic_year_end, description, avg_hours_per_week, api_score)
    VALUES (?, ?, ?, ?, ?, ?);
`;

async function insertSingleECF(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end,
        description,
        avg_hours_per_week,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end,
        description,
        avg_hours_per_week,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleECFRowQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            description,
            avg_hours_per_week,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ECF row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert ECF row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ECF row");

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

module.exports = insertSingleECF;
