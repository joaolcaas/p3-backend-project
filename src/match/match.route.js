const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service');
const controller = require('./match.controller');

//função que vai retornar todos os games marcados de um usuario
router.get('/:id',controller.allmatched);


// função que vai marcar jogos
router.post(':/id',controller.matchgame);

module.exports = router;