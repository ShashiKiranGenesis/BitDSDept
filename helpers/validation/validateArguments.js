const validateArguments = function (...arguments) {
    let isValid = true;
    for (let argument of arguments) {
        if (argument == "not-entered") {
            isValid = false;
            break;
        }
    }
    return isValid;
}

module.exports = validateArguments;