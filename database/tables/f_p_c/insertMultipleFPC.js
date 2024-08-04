// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple full papers in conference
const insertMultipleFPCQuery = `
    INSERT INTO 
    full_papers_in_conference (
        vtu_id,
        date_of_event,
        title_with_page,
        description,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES 
`;

async function insertMultipleFPC(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.title_with_page}', '${row.description}', '${row.peer_review_desc || ''}', ${row.no_of_co_authors}, '${row.main_author || ''}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultipleFPCQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple full papers in conference inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple full papers in conference",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple full papers in conference");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { rows }
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertMultipleFPC;