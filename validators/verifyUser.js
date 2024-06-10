const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyRegister = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Inserisci una mail.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Inserisci una mail valida.',
            bail: true
        },
        custom: {
            options: async (mail) => {
                const user = await prisma.user.findUnique({
                    where: {email: mail}
                });
                if(user){
                    throw Error(`Mail già utilizzata.`);
                }
                return true;
            }
        }
    },
    username: {
        in: ["body"],
        isString: {
            errorMessage: 'Inserisci un username valido (deve essere una stringa).',
            bail: true
        },
        isLength: {
            errorMessage: 'Inserisci un username valida (min. 8 caratteri)',
            options: {min: 3}
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Inserisci una password',
            bail: true
        },
        isString: {
            errorMessage: 'Inserisci una password valida (deve essere una stringa)',
            bail: true
        },
        isLength: {
            errorMessage: 'Inserisci una password valida (min. 8 caratteri)',
            options: {min: 8}
        }
    }
}

const verifyLogin = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Inserisci una mail.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Inserisci una mail valida.',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Inserisci una password.',
            bail: true
        },
        isString: {
            errorMessage: 'Inserisci una password valida (deve essere una stringa)',
            bail: true
        },
        isLength: {
            errorMessage: 'Inserisci una password valida (min. 8 caratteri)',
            options: {min: 8}
        }
    }
}

module.exports = {verifyRegister, verifyLogin}