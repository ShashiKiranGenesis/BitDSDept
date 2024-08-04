// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple PDA rows into the profesional_development_activity table
const insertMultiplePDARowsQuery = `
    INSERT 
    INTO profesional_development_activity (vtu_id, date_of_event, description, organizing_community, api_score) 
    VALUES 
`;

async function insertMultiplePDA(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.description}', '${row.organizing_community}', '${row.api_score}')`
        ).join(',');

        const query = insertMultiplePDARowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "PDA rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all PDA rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting PDA rows into the pda table");

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

module.exports = insertMultiplePDA;
