// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single ITRE row
const insertSingleITRERowQuery = `
    INSERT INTO innovative_teaching_resource_enhancement (vtu_id, academic_year_start, academic_year_end, description, api_score)
    VALUES (?, ?, ?, ?, ?);
`;

async function insertSingleITRE(data) {
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
        const [data] = await connection.query(insertSingleITRERowQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            description,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ITRE row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert ITRE row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ITRE row");

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

module.exports = insertSingleITRE;
