// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single research guidance row
const insertSingleResearchGuidanceQuery = `
    INSERT INTO 
    research_guidance (vtu_id, academic_year_start, academic_year_end, course_type, enrolled, thesis_submitted, degree_awarded, api_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleResearchGuidance(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end,
        course_type,
        enrolled,
        thesis_submitted,
        degree_awarded,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end,
        course_type,
        enrolled,
        thesis_submitted,
        degree_awarded,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleResearchGuidanceQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            course_type,
            enrolled,
            thesis_submitted,
            degree_awarded,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Research guidance row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert Research guidance row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting Research guidance row");

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

module.exports = insertSingleResearchGuidance;