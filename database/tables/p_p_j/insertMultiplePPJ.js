// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple published paper rows
const insertMultiplePPJQuery = `
    INSERT INTO 
    published_paper_in_journal (
        vtu_id,
        date_of_event,
        title_with_page,
        journal,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES 
`;

async function insertMultiplePPJ(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row => `('${row.vtu_id}', '${row.date_of_event}', '${row.title_with_page}', '${row.journal}', '${row.ISSN_ISBN}', '${row.peer_review_desc}', '${row.no_of_co_authors}', '${row.main_author}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultiplePPJQuery + values;

        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple published paper rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple published paper rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple published paper rows");

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

module.exports = insertMultiplePPJ;