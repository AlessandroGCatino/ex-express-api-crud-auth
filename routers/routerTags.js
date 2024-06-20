const express = require('express');
const router = express.Router();
const { create, show, index, update, destroy } = require('../controllers/controllerTags.js')
const validator = require('../middlewares/validator.js');
const {verifyID} = require('../validators/verifyID.js');
const {verifyRequest} = require('../validators/verifyTags.js');
const authenticateToken = require('../middlewares/auth.js');

// router.use(authenticateToken);

router.post('/', validator(verifyRequest), create);

router.get('/', index);

router.use('/:id', validator(verifyID))

// il check sull'id viene effettuato su tutte le route successive
router.get('/:id', show);

router.put('/:id', validator(verifyRequest), update);

router.delete('/:id', destroy);


module.exports = router;