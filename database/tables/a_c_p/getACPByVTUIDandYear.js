// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch article or chapter published rows by VTU ID and academic year range
const getACPByVtuIdAndYearQuery = `
    SELECT *
    FROM articles_chapters_published
    WHERE 
        vtu_id = ? AND 
        date_of_event BETWEEN ? AND ?;
`;

async function getACPByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [rows] = await connection.query(
            getACPByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        if (rows.length > 0)
            result = generateResponse(
                false,
                "Articles or chapters published rows fetched successfully",
                200,
                rows
            );
        else
            result = generateResponse(
                true,
                "No articles or chapters published rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching articles or chapters published rows");

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

module.exports = getACPByVtuIdAndYear;