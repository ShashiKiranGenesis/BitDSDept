// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch OCRPC rows by VTU ID and date range
const getOCRPCRowsByVtuIdAndYearQuery = `
    SELECT *
    FROM ongoing_completed_research_project_consultancy
    WHERE vtu_id = ?
    AND date_of_event BETWEEN ? AND ?;
`;

async function getOCRPCByVtuIdAndYear(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end
    };

    try {
        connection = await connect();
        const [data] = await connection.query(getOCRPCRowsByVtuIdAndYearQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end
        ]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "OCRPC rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No OCRPC rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching OCRPC rows by VTU ID and date range");

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

module.exports = getOCRPCByVtuIdAndYear;