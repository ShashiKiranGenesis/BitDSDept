// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to get one ISTH Row of given id
const getOneRowByIdQuery = `
    SELECT *
    FROM
        instructor_semester_teaching_hours
    WHERE id = ?
`;


async function getOneRowById(id) {
    let result;
    let connection;
    const payload = [Number(id)];

    try {
        connection = await connect();

        const [data] = await connection.query(getOneRowByIdQuery, payload);

        if (data.length != 0)
            result = generateResponse(
                false,
                "Successfully found user on ISTH Table",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "No Record with given id was found in the ISTH Table",
                400,
                { id }
            );

    } catch (error) {
        console.log("ERROR    Something went wrong when fetching ISTH Details of particular Employee of particular year");
        result = generateResponse(true, error.message, error.errno, payload);
    } finally {
        connection.end();
        return result;
    }
}


module.exports = getOneRowById;