// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple CCM rows into the contribution_to_corporate_management table
const insertMultipleCCMRowsQuery = `
    INSERT INTO contribution_to_corporate_management (vtu_id, academic_year_start, academic_year_end, description, api_score) 
    VALUES 
`;

async function insertMultipleCCM(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.description}', ${row.api_score})`
        ).join(',');

        const query = insertMultipleCCMRowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "CCM rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all CCM rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting CCM rows into the ccm table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            rows
        );

    } finally {
        return result;
    }
}

module.exports = insertMultipleCCM;
