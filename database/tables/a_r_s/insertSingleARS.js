// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single ARS row
const insertSingleARSRowQuery = `
    INSERT INTO additional_resources_to_students (vtu_id, academic_year_start, academic_year_end, course_name, consulted_from, prescribed_resources, additional_resources_provided)
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleARS(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end,
        course_name,
        consulted_from,
        prescribed_resources,
        additional_resources_provided
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end,
        course_name,
        consulted_from,
        prescribed_resources,
        additional_resources_provided
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleARSRowQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            course_name,
            consulted_from,
            prescribed_resources,
            additional_resources_provided
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ARS row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert ARS row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ARS row");

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

module.exports = insertSingleARS;