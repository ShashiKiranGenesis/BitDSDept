// Imports from server files
const defaultResponse = require("../response/defaultResponse");
const generateResponse = require("../response/generateResponse");
const { hasSameFields } = require("./fields");


// oldFields and newFields must be objects containing key value pairs
const stitchUpdateQuery = function (oldFields, newFields) {
    const arguments = { oldFields, newFields };
    let result = defaultResponse(arguments);

    let finalStitch = "";
    const stiches = [];
    const finalStitchOrder = [];

    if (!hasSameFields(oldFields, newFields)) {
        result = generateResponse(
            true,
            "Cannot update that field, invalid fields probably?",
            400,
            arguments
        );
    } else {
        const keys = Object.keys(newFields);
        
        for (let i = 0; i < keys.length; i++) {
            if (!(newFields[keys[i]] === "not-entered" || newFields[keys[i]] === oldFields[keys[i]])) {
                const clause = `${keys[i]} = ?`;

                // The set Query is built here
                stiches.push(clause);
                // The payload to the Set Query is built here
                finalStitchOrder.push(newFields[keys[i]]);
            }
        }

        finalStitch = finalStitch.concat("SET ", stiches.join(", "));
        result = generateResponse(
            false,
            "Update Set-Query Ready",
            200,
            { finalStitch, finalStitchOrder }
        );
    }

    return result;
};


module.exports = stitchUpdateQuery;