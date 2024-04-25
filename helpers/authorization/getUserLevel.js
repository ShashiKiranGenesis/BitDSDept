const getUserLevel = function (req) {
    return level = req?.session?.level ?? -1
}

module.exports = getUserLevel;