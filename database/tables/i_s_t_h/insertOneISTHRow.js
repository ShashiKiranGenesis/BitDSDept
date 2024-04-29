// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to Insert One Row into ISTH Table
const insertOneISTHRowQuery = `
    INSERT INTO instructor_semester_teaching_hours 
        (vtu_id, course_id, semester, tce, pce, academic_year_start, academic_year_end)
    VALUES 
        (?, ?, ?, ?, ?, ?, ?);
`;

async function insertOneISTHRow(vtu_id, course_id, semester, tce, pce, academic_year_start, academic_year_end) {
    let result;
    let connection;
    const payload = { vtu_id, course_id, semester, tce, pce, academic_year_start, academic_year_end };

    try {
        connection = await connect();

        const [data] = await connection.query(insertOneISTHRowQuery, Object.values(payload));
        
        if (data.affectedRows !== 0) {
            result = generateResponse(
                false,
                "Added Row To ISTH Table Successfully!",
                201,
                payload
            )
        }

    } catch (error) {
        console.log("ERROR    Something went wrong while inserting one row to the ISTH Table");
        result = generateResponse(true, error.message, error.errno, { 
        payload });
    
    } finally {
        connection.end();
        return result;
    }
}


module.exports = insertOneISTHRow;