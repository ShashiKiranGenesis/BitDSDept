// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to Delete one ISTH Row of given id
const deleteOneRowByIdQuery = `
    DELETE 
    FROM
        instructor_semester_teaching_hours
    WHERE id = ?
`;


async function deleteOneRowById(id) {
    let result;
    let connection;
    const payload = [id];

    try {
        connection = await connect();

        const [data] = await connection.query(deleteOneRowByIdQuery, payload);

        if (data.affectedRows != 0) {
            result = generateResponse(
                false,
                "The Row with given id was deleted Successfully",
                204,
                null
            );
        } else {
            result = generateResponse(
                true,
                "The row could not be deleted. don't know why",
                500,
                { id }
            );
        }

    } catch (error) {
        console.log("ERROR    Something went wrong when fetching ISTH Details of particular Employee of particular year");
        result = generateResponse(true, error.message, error.errno, payload);
    } finally {
        connection.end();
        return result;
    }
}


module.exports = deleteOneRowById;