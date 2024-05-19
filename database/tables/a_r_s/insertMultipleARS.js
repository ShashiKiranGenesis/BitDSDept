// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple ARS rows into the additional_resources_to_students table
const insertMultipleARSRowsQuery = `
    INSERT INTO additional_resources_to_students (vtu_id, academic_year_start, academic_year_end, course_name, consulted_from, prescribed_resources, additional_resources_provided) 
    VALUES 
`;

async function insertMultipleARS(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.course_name}', '${row.consulted_from}', '${row.prescribed_resources}', '${row.additional_resources_provided}')`
        ).join(',');

        const query = insertMultipleARSRowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "ARS rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all ARS rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ARS rows into the ars table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            rows
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertMultipleARS;