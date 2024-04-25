// Import from server-files here
const getUserByVtuID = require("./../../database/tables/users/getUserById");
const getLevelByVtuId = require("./../../database/connector tables/employee_designation/getLevelByVtuId");

const { isSamePassword } = require("./password");

const defaultResponse = require("./../response/defaultResponse");
const generateResponse = require("./../response/generateResponse");


const login = async function (req, res, vtu_id, password) {
    const arguments = { vtu_id, password };
    let result = defaultResponse(arguments);

    try {
        // fetches user password stored in db into result payload
        result = await getUserByVtuID(vtu_id);

        if (result.error) {
            res.status(401);

            result = generateResponse(
                true,
                "Invalid Credentials",
                401,
                arguments
            );
        } else {
            const { password: hash } = result.payload;

            // authentic is true if the entered password matches
            const authentic = await isSamePassword(password, hash);

            if (authentic) {
                // level is fetched only if user is authentic, to reduce computations
                result = await getLevelByVtuId(vtu_id);

                if (result.error) {
                    res.status(401);
                    result = generateResponse(
                        true,
                        "User doesn't seem to have a post in BIT",
                        401,
                        arguments
                    )
                } else {
                    result = generateResponse(
                        false,
                        "Login Successfull!!",
                        200,
                        { ...result.payload }
                    );
                    
                    req.session.vtu_id = result?.payload?.vtu_id ?? "Not Logged in";
                    req.session.level = result?.payload?.max_level ?? -1;
                }
            } else {
                // User if found to be not authentic
                res.status(401);
                result = generateResponse(
                    true,
                    "Invalid Credentials",
                    401,
                    arguments
                )

                console.log(result);
            }
        }
    } catch (error) {
        console.log("Something went wrong while logging in user");
        console.log(error.message);

        res.status(401);
        result = generateResponse(
            true,
            error.message,
            401,
            arguments
        );

    } finally {
        return result;
    }

}

module.exports = login;