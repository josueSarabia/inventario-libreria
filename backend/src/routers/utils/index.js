function getMissingValues(object) {
    const missingValues = []
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if (element == null || element === NaN) {
                missingValues.push(key)
            }
        }
    }

    return missingValues
}

module.exports = {
    getMissingValues: getMissingValues
}