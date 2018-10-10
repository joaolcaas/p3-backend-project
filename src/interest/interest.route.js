const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service');
const controller = require('./interest.controller');

router.get('/:id',auth.ensureAuthenticated, auth.authenticateById,controller.getinterst);

router.post('/:id',auth.ensureAuthenticated,auth.authenticateById,controller.postinterest);

module.exports = router;