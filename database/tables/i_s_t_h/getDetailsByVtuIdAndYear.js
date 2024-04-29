// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to fetch isthDetails of an Employee belonging to a particular year
const getISTHDetailsByVtuIdAndYearQuery = `
    SELECT 
        isth.id AS id,
        c.name AS course_name,
        al.name AS level,
        c.cpw AS classes_per_week,
        isth.tce AS theory_classes_enrolled,
        isth.pce AS practical_classes_enrolled
    FROM instructor_semester_teaching_hours AS isth
    JOIN courses AS c ON isth.course_id = c.id
    JOIN academic_levels AS al ON c.level_id = al.id
    WHERE isth.vtu_id = ?
    AND isth.academic_year_start = ?;
`;


async function getISTHDetailsByVtuIdAndYear(vtu_id, year) {
    let result;
    let connection;
    const payload = [vtu_id, year];

    try {
        connection = await connect();

        const [data] = await connection.query(getISTHDetailsByVtuIdAndYearQuery, payload);

        if (data.length === 0) {
            result = generateResponse(
                true,
                "Details for particular year for particlar employee not found",
                400,
                { vtu_id, year }
            );
        } else {
            result = generateResponse(
                false,
                "ISTH Details Found, details sent!!",
                200,
                { details: data[0] }
            );
        }


    } catch (error) {
        console.log("ERROR    Something went wrong when fetching ISTH Details of particular Employee of particular year");
        result = generateResponse(true, error.message, error.errno, payload);
    } finally {
        connection.end();
        return result;
    }
}


module.exports = getISTHDetailsByVtuIdAndYear;