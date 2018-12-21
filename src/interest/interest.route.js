const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service');
const controller = require('./interest.controller');

router.get('/:id',controller.getinterst);

router.post('/:id',controller.postinterest);

module.exports = router;