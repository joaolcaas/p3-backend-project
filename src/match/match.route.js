const express = require('express');
const router = new express.Router();

const users = require('../data/user.json');

router.use((req,res,next) => {
    next();
});

/**
 * return all matchs
 */
router.get('/',function(req,res){
    const users_game = []
    users.forEach(function(element){
        users_game.push(element.games_matched)
    });
    res.send(users_game)
});
module.exports = router;