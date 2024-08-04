// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple examination duty rows into the examination_duties table
const insertMultipleExaminationDutiesRowsQuery = `
    INSERT INTO examination_duties (vtu_id, academic_year_start, academic_year_end, exam_type, duty_assigned, extent_carried_out, api_score) 
    VALUES 
`;

async function insertMultipleExaminationDuties(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.academic_year_start}', '${row.academic_year_end}', '${row.exam_type}', '${row.duty_assigned}', '${row.extent_carried_out}', '${row.api_score}')`
        ).join(',');

        const query = insertMultipleExaminationDutiesRowsQuery + values;

        const [data] = await connection.query(query);

        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Examination duty rows Inserted Successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all examination duty rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting examination duty rows into the table");

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

module.exports = insertMultipleExaminationDuties;
