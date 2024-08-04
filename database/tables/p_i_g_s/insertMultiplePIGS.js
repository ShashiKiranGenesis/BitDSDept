// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple programmes invited as guest speaker rows
const insertMultiplePIGSQuery = `
    INSERT INTO 
    programmes_invited_as_guest_speaker (
        vtu_id,
        date_of_event,
        title_of_lecture,
        title_of_conference,
        event_level,
        organized_by,
        api_score
    ) 
    VALUES 
`;

async function insertMultiplePIGS(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.date_of_event}', '${row.title_of_lecture}', '${row.title_of_conference}', '${row.event_level}', '${row.organized_by}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultiplePIGSQuery + values;
        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple programmes invited as guest speaker rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple programmes invited as guest speaker rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple programmes invited as guest speaker rows");

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

module.exports = insertMultiplePIGS;