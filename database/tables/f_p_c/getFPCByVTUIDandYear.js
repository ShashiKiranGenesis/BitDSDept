// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch full papers in conference by VTU ID and academic year range
const getFPCByVtuIdAndYearQuery = `
    SELECT *
    FROM full_papers_in_conference
    WHERE 
        vtu_id = ? 
        AND date_of_event BETWEEN ? AND ?;
`;

async function getFPCByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();

        const [data] = await connection.query(
            getFPCByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        result = generateResponse(
            false,
            "Full papers in conference fetched successfully",
            200,
            data
        );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching full papers in conference by VTU ID and year");

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

module.exports = getFPCByVtuIdAndYear;