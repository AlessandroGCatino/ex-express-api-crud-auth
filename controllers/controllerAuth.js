const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require("../utils.js");
const { hashPassword, comparePassword } = require("../utils.js");



const register = async (req, res, next) => {

    try{
        const { email, username, password } = req.body;
        const data = { 
            email, 
            username, 
            password: await hashPassword(password),
        }
        const newUser = await prisma.user.create({data});

        const token = generateToken({
            email: newUser.email,
            username: newUser.username
        });

        res.json({ token });

    }catch(e){
        next(e)
    }
}

const login = async (req, res, next) => {

    try{

        const { email, password } = req.body;

        // check per vedere se l'utente esiste
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(!user){
            throw new Error("Errore nella mail o nella password");
        }

        // se esiste verifico che la password sia corretta
        const checkPassword = await comparePassword(password, user.password);
        if(!checkPassword){
            throw new Error("Errore nella mail o nella password");
        }

        const token = generateToken({
            email: user.email,
            username: user.username
        });

        res.json({ token, data: user });

    }catch(e){
        next(e);
    }

}

module.exports = {register, login}