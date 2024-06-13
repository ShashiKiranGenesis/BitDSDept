// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch PDA rows by VTU ID and date range
const getPDARowsByVtuIdAndDateRangeQuery = `
    SELECT *
    FROM profesional_development_activity
    WHERE vtu_id = ?
    AND date_of_event BETWEEN ? AND ?;
`;

async function getPDAByVtuIdAndDateRange(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [data] = await connection.query(getPDARowsByVtuIdAndDateRangeQuery, [vtu_id, academic_year_start, academic_year_end]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "PDA rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No PDA rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching PDA rows by VTU ID and date range");

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

module.exports = getPDAByVtuIdAndDateRange;
