// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch ECF rows by VTU ID and academic year
const getECFRowsByVtuIdAndAcademicYearQuery = `
    SELECT *
    FROM extentions_cocurricular_field_activity
    WHERE vtu_id = ?
    AND academic_year_start = ?
    AND academic_year_end = ?;
`;

async function getECFByVtuIdAndAcademicYear(data) {
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
        const [data] = await connection.query(getECFRowsByVtuIdAndAcademicYearQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end
        ]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "ECF rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No ECF rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ECF rows by VTU ID and academic year");

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

module.exports = getECFByVtuIdAndAcademicYear;