// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch published paper rows by VTU ID and academic year range
const getPPJByVtuIdAndYearQuery = `
    SELECT *
    FROM published_paper_in_journal
    WHERE 
        vtu_id = ? AND 
        date_of_event BETWEEN ? AND ?;
`;

async function getPPJByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [rows] = await connection.query(
            getPPJByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        if (rows.length > 0)
            result = generateResponse(
                false,
                "Published paper rows fetched successfully",
                200,
                rows
            );
        else
            result = generateResponse(
                true,
                "No published paper rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching published paper rows");

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

module.exports = getPPJByVtuIdAndYear;