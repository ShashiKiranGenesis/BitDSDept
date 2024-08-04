// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple papers presented rows
const insertMultiplePPCSWQuery = `
    INSERT INTO 
    papers_presented_conference_seminar_workshop (
        vtu_id,
        date_of_event,
        title_of_paper,
        title_of_event,
        event_level,
        organized_by,
        api_score
    ) 
    VALUES 
`;

async function insertMultiplePPCSW(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.title_of_paper}', '${row.title_of_event}', '${row.event_level}', '${row.organized_by}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultiplePPCSWQuery + values;
        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple papers presented rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple papers presented rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple papers presented rows");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { rows }
        );

    } finally {
        return result;
    }
}

module.exports = insertMultiplePPCSW;