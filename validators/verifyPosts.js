const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyRequest = {
    title: {
        notEmpty: {
            errorMessage: 'Inserisci il titolo',
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: 'Il titolo deve essere lungo almeno 5 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa'
        }
    },
    // slug: {
    //     notEmpty: {
    //         errorMessage: 'Inserisci lo slug',
    //         bail: true
    //     },
    //     isLength: {
    //         options: { min: 5},
    //         errorMessage: 'Lo slug deve essere lungo almeno 5 caratteri',
    //         bail: true
    //     },
    //     isString: {
    //         errorMessage: 'Lo slug deve essere una stringa'
    //     }
    // },
    image: {
        notEmpty: {
            errorMessage: "Inserisci l'immagine",
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: "La stringa dell'immagine deve essere lunga almeno 5 caratteri",
            bail: true
        },
        isString: {
            errorMessage: "L'immagine deve essere una stringa"
        }
    },
    content: {
        notEmpty: {
            errorMessage: "Inserisci il content",
            bail: true
        },
        isLength: {
            options: { min: 1},
            errorMessage: "La stringa del content deve essere lunga almeno 1 carattere",
            bail: true
        },
        isString: {
            errorMessage: "Il content deve essere una stringa"
        }
    },
    published: {
        notEmpty: {
            errorMessage: "Dichiara se il post è pubblicato o meno",
            bail: true
        },
        isBoolean: {
            errorMessage: "Il campo published deve contenere true o false",
        }
    },
    categoryID: {
        in: ["body"],        
        custom: {
            options: async (value) => {
                const categoryID = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: {id: categoryID}
                });
                if (!category) {
                    throw new Error("La categoria non esiste");
                }
                return true;
            }
        }
    },
    // userId: {
    //     in: ["body"],
    //     isInt: {
    //         errorMessage: "L'id dell'utente deve essere un intero",
    //         bail: true
    //     },
    //     custom: {
    //         options: async (userId) => {
    //             const searchID = parseInt(userId);
    //             const category = await prisma.user.findUnique({
    //                 where: {id: searchID}
    //             });
    //             if (!category) {
    //                 throw new Error("L'utente non esiste");
    //             }
    //             return true;
    //         }
    //     }
    // },
    tags: {
        in : ["body"],
        notEmpty: {
            errorMessage: "Inserisci almeno un tag",
            bail: true
        },
        isArray: {
            errorMessage: "Tags deve essere un array",
            bail: true
        },
        custom: {
            options: async (tags) => {
                try{
                    if(tags.length === 0){
                        throw new Error(`Inserisci almeno un tag`);
                    }
                    const checkId = tags.find(tagID => isNaN(parseInt(tagID)));
        
                    if(checkId){
                        throw new Error(`Verifica che tutti i tag siano numeri interi`);
                    }
                    
                    const intTags = tags.map(tagID => {
                        const intTagID = parseInt(tagID, 10);
                        if (isNaN(intTagID)) {
                            throw new Error(`Verifica che tutti i tag siano numeri interi`);
                        }
                        return intTagID;
                    });
    
                    tags = intTags

                    const linkedTags = await prisma.tag.findMany({
                        where: {
                            id: {
                                in: intTags
                            }
                        }
                    })
                    if (linkedTags.length !== tags.length) {
                        throw new Error("Almeno un tag inserito non esiste");
                    }
                    return true;
                } catch (e) {
                    throw e;
                }
            }
    
        }
    }
}



module.exports = {verifyRequest}

