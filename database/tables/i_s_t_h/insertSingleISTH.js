// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single row into the isth table
const insertSingleISTHQuery = `
    INSERT INTO instructor_semester_teaching_hours (vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end)
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleISTH(vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end) {
    let connection;
    let result;
    const arguments = {vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end};

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleISTHQuery, [vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ISTH row Inserted Successfully",
                201,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Could not insert ISTH row",
                401,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Inserting ISTH row into the isth table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        return result;
    }
}

module.exports = insertSingleISTH;
