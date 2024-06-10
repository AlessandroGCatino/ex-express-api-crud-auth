const verifyRequest = {
    title: {
        notEmpty: {
            errorMessage: 'Inserisci il titolo',
            bail: true
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Il titolo deve essere lungo almeno 3 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa'
        }
    }
}

module.exports = { verifyRequest };

