// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple OCRPC rows into the ongoing_completed_research_project_consultancy table
const insertMultipleOCRPCRowsQuery = `
    INSERT INTO 
    ongoing_completed_research_project_consultancy (vtu_id, date_of_event, duration, title, description, agency, status, grant_recieved, api_score) 
    VALUES 
`;

async function insertMultipleOCRPC(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.duration}', '${row.title}', '${row.description}', '${row.agency}', '${row.status}', '${row.grant_recieved}', '${row.api_score}')`
        ).join(',');

        const query = insertMultipleOCRPCRowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "OCRPC rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all OCRPC rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting OCRPC rows into the OCRPC table");

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

module.exports = insertMultipleOCRPC;