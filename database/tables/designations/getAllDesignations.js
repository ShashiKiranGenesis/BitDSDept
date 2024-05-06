// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");


//The Query to get all rows of the designations Table
const getAllDesignationsQuery = `
    SELECT *
    FROM designations;
`;


async function getAllDesignations() {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getAllDesignationsQuery);

        if (data.length === 0)
            result = generateResponse(
                true,
                "There seems to be no designations in BIT",
                200,
                data
            );
        else
            result = generateResponse(
                false,
                "All Available designations sent",
                200,
                data
            );
    } catch (error) {
        console.log("ERROR    Something went Wrong while Fetching all designations from designations table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            {}
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = getAllDesignations;