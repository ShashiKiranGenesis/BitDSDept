// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple development programme attended rows
const insertMultipleDPAQuery = `
    INSERT INTO 
    development_programme_attended (
        vtu_id,
        date_of_event,
        description,
        duration,
        organized_by,
        api_score
    ) 
    VALUES 
`;

async function insertMultipleDPA(rows) {
    let connection;
    let result;


    try {
        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.description}', '${row.duration}', '${row.organized_by}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultipleDPAQuery + values;

        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple development programme attended rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all Multiple development programme attended rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple development programme attended rows");

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

module.exports = insertMultipleDPA;