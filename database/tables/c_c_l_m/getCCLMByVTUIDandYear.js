// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch CCM rows by VTU ID and academic year
const getCCMRowsByVtuIdAndAcademicYearQuery = `
    SELECT *
    FROM contribution_to_corporate_management
    WHERE vtu_id = ?
    AND academic_year_start = ?
    AND academic_year_end = ?;
`;

async function getCCMByVtuIdAndAcademicYear(data) {
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
        const [data] = await connection.query(getCCMRowsByVtuIdAndAcademicYearQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end
        ]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "CCM rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No CCM rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching CCM rows by VTU ID and academic year");

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

module.exports = getCCMByVtuIdAndAcademicYear;
