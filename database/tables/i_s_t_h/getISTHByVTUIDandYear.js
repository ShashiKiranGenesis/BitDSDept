// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch ISTH rows by vtu_id, academic year start, and academic year end
const getISTHByVTUAndAcademicYearQuery = `
    SELECT *
    FROM instructor_semester_teaching_hours
    WHERE 
        vtu_id = ? AND 
        academic_year_start = ? AND 
        academic_year_end = ?;
`;

async function getISTHByVTUAndAcademicYear(vtu_id, academic_year_start, academic_year_end) {
    let connection;
    let result;
    const arguments = {vtu_id, academic_year_start, academic_year_end};

    try {
        connection = await connect();
        const [data] = await connection.query(getISTHByVTUAndAcademicYearQuery, [vtu_id, academic_year_start, academic_year_end]);
        
        if (data.length > 0)
            result = generateResponse(
                false,
                "ISTH rows Fetched Successfully",
                200,
                data
            );
        else
            result = generateResponse(
                true,
                "No ISTH rows found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR    Something went Wrong Fetching ISTH rows by VTU ID and Academic Year from the isth table");

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

module.exports = getISTHByVTUAndAcademicYear;