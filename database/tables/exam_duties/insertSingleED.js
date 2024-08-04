// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single examination duty row
const insertSingleExaminationDutyRowQuery = `
    INSERT INTO examination_duties (vtu_id, academic_year_start, academic_year_end, exam_type, duty_assigned, extent_carried_out, api_score)
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleExaminationDuty(data) {
    let connection;
    let result;

    const {
        vtu_id,
        academic_year_start,
        academic_year_end,
        exam_type,
        duty_assigned,
        extent_carried_out,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        academic_year_start,
        academic_year_end,
        exam_type,
        duty_assigned,
        extent_carried_out,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleExaminationDutyRowQuery, [
            vtu_id,
            academic_year_start,
            academic_year_end,
            exam_type,
            duty_assigned,
            extent_carried_out,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Examination duty row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert examination duty row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting examination duty row");

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

module.exports = insertSingleExaminationDuty;
