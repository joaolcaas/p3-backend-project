const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service');
const controller = require('./match.controller');

//função que vai retornar todos os games marcados de um usuario
router.get('/:id', auth.ensureAuthenticated, auth.authenticateById,controller.allmatched);


// função que vai marcar jogos
router.post(':/id',auth.ensureAuthenticated,controller.matchgame);

module.exports = router;