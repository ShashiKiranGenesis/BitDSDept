function invalidArguments(...arguments) {

    return {

        error: true,
        message: "arguments may have not been valid or entered",
        statusCode: 400,
        payload: {
            ...arguments
        }

    }

}

module.exports = invalidArguments;