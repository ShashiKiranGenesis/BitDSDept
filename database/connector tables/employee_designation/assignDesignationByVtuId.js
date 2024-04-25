// Imports from Server Files
const generateResponse = require("../../../helpers/response/generateResponse");
const connect = require("./../../connect");

// The Query to Assign a Role to an Existing Employee
const assignDesignationByVtuIdQuery = `
    INSERT INTO employee_designation(vtu_id, title)
    VALUES
    (?, ?)
`;


async function assignDesignationByVtuId(vtu_id, title) {
    const arguments = { vtu_id, title };
    let result;

    let connection;

    try {
        connection = await connect();

        // This will Insert a new Row to the employee_designation Table
        const [data] = await connection.query(assignDesignationByVtuIdQuery, [...Object.values(arguments)]);

        // If Row is Successfully Inserted
        if (data.affectedRows === 1) {
            result = generateResponse(
                false,
                "Employee asssigned role Successfully!",
                201,
                arguments
            );
        }
        // If Something goes Wrong while Inserting 
        else {
            result = generateResponse(
                true,
                "Could not assign Role for some Reason",
                500,
                data
            );
        }
    } catch (error) {
        console.log("ERROR    Something went wrong while assigning Roll to Employee");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );
    } finally {
        connection.end();

        return result;
    }
}


module.exports = assignDesignationByVtuId;