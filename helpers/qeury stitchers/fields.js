const hasSameFields = function (obj1 = {}, obj2 = {}) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
    }

    return true;
}

module.exports = { hasSameFields };
