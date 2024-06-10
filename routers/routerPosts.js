const express = require('express');
const router = express.Router();
const { create, show, index, update, destroy } = require('../controllers/controllerPosts.js')
const validator = require('../middlewares/validator.js');
const { verifySlug } = require('../validators/verifySlug.js');
const { verifyRequest } = require('../validators/verifyPosts.js');
const authenticateToken = require('../middlewares/auth.js');

router.use(authenticateToken);

router.post('/', validator(verifyRequest), create);

router.get('/', index);


router.use('/:slug', validator(verifySlug))
// il check sullo Slug viene effettuato su tutte le route successive


router.get('/:slug', show);

router.put('/:slug', validator(verifyRequest), update);

router.delete('/:slug', destroy);


module.exports = router;
