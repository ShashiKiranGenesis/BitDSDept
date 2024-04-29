// Imports from Server Files
const insertOneISTHRow = require("./../../../database/tables/i_s_t_h/insertOneISTHRow");

const handleInsertOneISTHRow = async function (arguments) {
    const {
        vtu_id,
        course_id,
        semester,
        tce,
        pce,
        academic_year_start,
        academic_year_end
    } = arguments;

    const result = await insertOneISTHRow(vtu_id, course_id, semester, tce, pce, academic_year_start, academic_year_end);

    return result;
}

module.exports = handleInsertOneISTHRow;