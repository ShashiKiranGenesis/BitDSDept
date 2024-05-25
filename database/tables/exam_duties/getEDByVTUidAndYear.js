// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch examination duty rows by VTU ID and academic year
const getExaminationDutiesByVtuIdAndAcademicYearQuery = `
    SELECT *
    FROM examination_duties
    WHERE vtu_id = ?
    AND academic_year_start = ?
    AND academic_year_end = ?;
`;

async function getExaminationDutiesByVtuIdAndAcademicYear(data) {
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
        const [data] = await connection.query(getExaminationDutiesByVtuIdAndAcademicYearQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end
        ]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Examination duty rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No examination duty rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching examination duty rows by VTU ID and academic year");

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

module.exports = getExaminationDutiesByVtuIdAndAcademicYear;
