const getUserLevel = require("./getUserLevel");

const isAuthorized = function (req, requiredLevel) {
    let flag = false;

    if (getUserLevel(req) >= requiredLevel) flag = true;

    return flag;
}

module.exports = isAuthorized;