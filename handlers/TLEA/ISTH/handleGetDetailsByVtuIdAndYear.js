// Import from Server Files
const getISTHDetailsByVtuIdAndYear = require("../../../database/tables/i_s_t_h/getDetailsByVtuIdAndYear");

const handleGetDetailsByVtuIdAndYear = async function(vtu_id, year) {
    let result = await getISTHDetailsByVtuIdAndYear(vtu_id, year);

    return result;
}


module.exports = handleGetDetailsByVtuIdAndYear;