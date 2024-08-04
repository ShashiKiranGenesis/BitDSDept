// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch papers presented rows by VTU ID and academic year range
const getPPCSWByVtuIdAndYearQuery = `
    SELECT *
    FROM papers_presented_conference_seminar_workshop
    WHERE 
        vtu_id = ? AND 
        date_of_event BETWEEN ? AND ?;
`;

async function getPPCSWByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [rows] = await connection.query(
            getPPCSWByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        if (rows.length > 0)
            result = generateResponse(
                false,
                "Papers presented rows fetched successfully",
                200,
                rows
            );
        else
            result = generateResponse(
                true,
                "No papers presented rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching papers presented rows");

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

module.exports = getPPCSWByVtuIdAndYear;