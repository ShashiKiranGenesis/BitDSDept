// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple ECF rows into the extentions_cocurricular_field_activity table
const insertMultipleECFRowsQuery = `
    INSERT 
    INTO extentions_cocurricular_field_activity (vtu_id, academic_year_start, academic_year_end, description, avg_hours_per_week, api_score) 
    VALUES 
`;

async function insertMultipleECF(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.description}', '${row.avg_hours_per_week}', '${row.api_score}')`
        ).join(',');

        const query = insertMultipleECFRowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "ECF rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all ECF rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting ECF rows into the ecf table");

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

module.exports = insertMultipleECF;
