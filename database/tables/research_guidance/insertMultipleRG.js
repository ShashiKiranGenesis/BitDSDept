// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple research guidance rows into the research_guidance table
const insertMultipleResearchGuidanceQuery = `
    INSERT INTO 
    research_guidance (vtu_id, academic_year_start, academic_year_end, course_type, enrolled, thesis_submitted, degree_awarded, api_score) 
    VALUES 
`;

async function insertMultipleResearchGuidance(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.course_type}', '${row.enrolled}', '${row.thesis_submitted}', '${row.degree_awarded}', '${row.api_score}')`
        ).join(',');

        const query = insertMultipleResearchGuidanceQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Research guidance rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all Research guidance rows",
                500,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting Research guidance rows into the research_guidance table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            rows
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertMultipleResearchGuidance;