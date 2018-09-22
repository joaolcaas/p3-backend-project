const express = require('express');
const router = new express.Router();
const user_util = require('../util/user.util')
const users = require('../data/user.json');
const util = require('./match.util')

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

// função que vai marcar jogos
router.put('/',function(req,res){
    const user1 = user_util.findUser(users,req.query.id1) 
    const user2 = user_util.findUser(users,req.query.id2)
    const game = req.query.game
    const data = req.query.data

    if(util.findGame(user1,game) == null && util.findGame(user2,game) == null){
        return res.status(400).send('O outro usuário não contém esse game')
    }
    else if(util.findHour(util.findGame(user1,game),data) == false && util.findHour(util.findGame(user2,game),data) == false ){
        return res.status(400).send('O outro usuário não contém esse horario')
    }
    const game_alredy_matched_user1 = {
        "nome":user2.name,
        "email":user2.email,
        "game":game,
        "data":data
    }
    const game_alredy_matched_user2 = {
        "nome":user1.name,
        "email":user1.email,
        "game":game,
        "data":data
    }

    user1.games_matched.push(game_alredy_matched_user1)
    user2.games_matched.push(game_alredy_matched_user2)

    return res.status(200).send('Jogo marcado com sucesso')
    //só falta apagar dos interest games

 });

module.exports = router;