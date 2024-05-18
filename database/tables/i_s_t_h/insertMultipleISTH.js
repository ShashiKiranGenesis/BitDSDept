// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple rows into the isth table
let insertMultipleISTHQuery = `
    INSERT INTO instructor_semester_teaching_hours (vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end) 
    VALUES 
`;

async function insertMultipleISTH(rows) {
    let connection;
    let result;

    try {
        connection = await connect();

        const values = rows.map(
            row =>
                `('${row.vtu_id}', '${row.course_name}', ${row.semester}, ${row.tce}, ${row.pce}, '${row.academic_year_start}', '${row.academic_year_end}')`
        ) .join(',');

        insertMultipleISTHQuery += values;

        const [data] = await connection.query(insertMultipleISTHQuery);

        if (data.affectedRows === rows.length)
            result = generateResponse(
                false,
                "ISTH rows Inserted Successfully",
                201,
                rows
            );
        else
            result = generateResponse(
                true,
                "Could not insert all ISTH rows",
                401,
                rows
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Inserting ISTH rows into the isth table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            rows
        );
        
    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertMultipleISTH;