const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/controllerAuth.js')
const validator = require('../middlewares/validator.js');
const { verifyRegister } = require('../validators/verifyUser.js');
const { verifyLogin } = require('../validators/verifyUser.js');

router.post('/register',validator(verifyRegister), register);
router.post('/login', validator(verifyLogin), login);

module.exports = router;