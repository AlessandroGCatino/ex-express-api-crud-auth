const verifyID = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "ID deve essere un intero"
        }
    }
}

module.exports = {verifyID};