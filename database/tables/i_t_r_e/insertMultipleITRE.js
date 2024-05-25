// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple ITRE rows into the innovative_teaching_resource_enhancement table
const insertMultipleITRERowsQuery = `
    INSERT INTO innovative_teaching_resource_enhancement (vtu_id, academic_year_start, academic_year_end, description, api_score) 
    VALUES 
`;

async function insertMultipleITRE(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.description}', '${row.api_score}')`
        ).join(',');

        const query = insertMultipleITRERowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "ITRE rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all ITRE rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ITRE rows into the itre table");

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

module.exports = insertMultipleITRE;
