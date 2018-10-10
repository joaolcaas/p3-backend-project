const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service')
const controller = require('./game.controller');

router.use((req,res,next) => {
    next();
});
router.get('/',controller.allgames);

router.post('/',auth.ensureAuthenticated,auth.authenticateByRole,controller.postgame);

module.exports = router;