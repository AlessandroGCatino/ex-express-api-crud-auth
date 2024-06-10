const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, expiresIn = '2h') => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password + process.env.PEPPER_KEY, 10);
    return hashPassword;
}

const comparePassword = async (password, hashPassword) => {
    const checkPassword = await bcrypt.compare(password + process.env.PEPPER_KEY, hashPassword);
    return checkPassword;
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
}