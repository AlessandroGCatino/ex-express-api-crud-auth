const verifySlug = {
    slug: {
        in: ["params"],
        isString: {
            errorMessage: "Lo Slug deve essere una stringa"
        },
        isLength: {
            errorMessage: "Lo Slug deve essere lungo almeno 3 caratteri",
            options: { min: 3 }
        }
    }
}

module.exports = {verifySlug};