// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch book published rows by VTU ID and academic year range
const getBPByVtuIdAndYearQuery = `
    SELECT *
    FROM books_published
    WHERE 
        vtu_id = ? AND 
        date_of_event BETWEEN ? AND ?;
`;

async function getBPByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [rows] = await connection.query(
            getBPByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        if (rows.length > 0)
            result = generateResponse(
                false,
                "Book published rows fetched successfully",
                200,
                rows
            );
        else
            result = generateResponse(
                true,
                "No book published rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching book published rows");

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

module.exports = getBPByVtuIdAndYear;