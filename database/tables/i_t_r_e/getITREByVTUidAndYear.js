// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch ITRE rows by VTU ID and academic year
const getITRERowsByVtuIdAndAcademicYearQuery = `
    SELECT *
    FROM innovative_teaching_resource_enhancement
    WHERE vtu_id = ?
    AND academic_year_start = ?
    AND academic_year_end = ?;
`;

async function getITREByVtuIdAndAcademicYear(data) {
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
        const [data] = await connection.query(getITRERowsByVtuIdAndAcademicYearQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end
        ]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "ITRE rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No ITRE rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ITRE rows by VTU ID and academic year");

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

module.exports = getITREByVtuIdAndAcademicYear;
