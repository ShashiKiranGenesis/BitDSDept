// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");


//The Query to Add a row to the designations table
const insertNewDesignationQuery = `
    INSERT
    INTO designations(title, level)
    VALUES (?, ?);
`;


async function insertNewDesignation(title, level) {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(insertNewDesignationQuery, [title, level]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "New Designation Added Successfully",
                201,
                { title, level }
            );
        else
            result = generateResponse(
                true,
                "Could not add new Designation",
                401,
                { title, level }
            );

    } catch (error) {
        console.log("ERROR    Something went Wrong Adding new Designation to the designations table");

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

module.exports = insertNewDesignation;