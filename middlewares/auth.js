const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {

    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if(!token){
        throw new Error('Token non fornito');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err){
            throw new Error('Token non valido');
        }
        req.user = data;
        next();
    });
}

module.exports = verifyToken