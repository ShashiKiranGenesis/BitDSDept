// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch development programme attended rows by VTU ID and academic year range
const getDPAByVtuIdAndYearQuery = `
    SELECT *
    FROM development_programme_attended
    WHERE 
        vtu_id = ? AND 
        date_of_event BETWEEN ? AND ?;
`;

async function getDPAByVtuIdAndYear(data) {
    let connection;
    let result;

    const { vtu_id, academic_year_start, academic_year_end } = data;
    const arguments = { vtu_id, academic_year_start, academic_year_end };

    try {
        connection = await connect();
        const [rows] = await connection.query(
            getDPAByVtuIdAndYearQuery,
            [vtu_id, academic_year_start, academic_year_end]
        );

        if (rows.length > 0)
            result = generateResponse(
                false,
                "Development programme attended rows fetched successfully",
                200,
                rows
            );
        else
            result = generateResponse(
                true,
                "No development programme attended rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching development programme attended rows");

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

module.exports = getDPAByVtuIdAndYear;