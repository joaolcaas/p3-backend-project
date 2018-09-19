const express = require('express');
const router = new express.Router();
const user_util = require('../util/user.util')
const users = require('../data/user.json');

router.use((req,res,next) => {
    next();
});


router.get('/',function(req,res){
    const users_game = []
    users.forEach(function(element){
        users_game.push(element.games_matched)
    });
    res.send(users_game)
});

router.get('/:id1/:id2',function(req,res){
    const user1 = user_util.findUser(users,req.params.id1) 
    const user2 = user_util.findUser(users,req.params.id2)

    if(user1.interest_games[0].game[0] == user2.interest_games[0].game[0] && user1.interest_games[0].data[0] == user2.interest_games[0].data[0]){
        
    }


 });

module.exports = router;