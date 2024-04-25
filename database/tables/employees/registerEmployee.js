// Imports from Server Files
const connect = require("./../../connect");

const { hashPassword: hashString } = require("./../../../helpers/authentication/password");
const generateResponse = require("../../../helpers/response/generateResponse");


// The Query to Insert a new Employee into the Employees Table
const registerEmployeeQuery = `
    INSERT INTO employees (
        vtu_id,
        full_name,
        father_name,
        mother_name,
        mobile,
        emergency_mobile,
        pad,
        email_address,
        pan_number
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
`;


async function registerEmployee(employee) {
    let connection;
    let {
        vtu_id,
        full_name,
        father_name,
        mother_name,
        mobile,
        emergency_mobile,
        pad,
        email_address,
        pan_number
    } = employee;

    let result;

    try {
        connection = await connect();

        // Pan-Number will be Hashed before it is Stored in DB
        pan_number = await hashString(pan_number);

        // Initial Data required for a new Employee
        const arguments = {
            vtu_id,
            full_name,
            father_name,
            mother_name,
            mobile,
            emergency_mobile,
            pad,
            email_address,
            pan_number
        };

        
        const [data] = await connection.query(registerEmployeeQuery, Object.values(arguments));

        // If Employee is Added to the DB Successfully
        if (data?.affectedRows === 1) {
            result = generateResponse(
                false,
                "Employee Registered Succesfully",
                201,
                { ...arguments }
            );
        }
        // If Something goes Wrong while adding new User to DB 
        else {
            result = generateResponse(
                true,
                "Something went wrong while adding Employee to DB",
                500,
                { ...arguments }
            );
        }

    } catch (error) {
        console.log("ERROR    Something Went Wrong while inserting Employee to DB");
        console.log(error.message);

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
};

module.exports = registerEmployee;