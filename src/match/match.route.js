const express = require('express');
const router = new express.Router();
const user_util = require('../util/user.util')
const users = require('../data/user.json');
const util = require('./match.util')
const modelUser = require('../user/user.model')


router.use((req,res,next) => {
    next();
});

//função que vai retornar todos os games marcados de um usuario
router.get('/:id',function(req,res){
    const user_id = req.params.id;
    
    modelUser.findOne({'id':user_id}).then((user,err)=>{
        if(err || user == null){
            return res.status(400).send('usuario não encontrado')
        }else{
            if(users.games_matched != null){
                return res.status(200).send(user.games_matched)
            }else{
                return res.status(400).send('você não tem jogos marcados')
            }
        }
    })
});


// função que vai marcar jogos
router.put('/',function(req,res){  
    const user_id1 = req.query.id1;
    const user_id2 = req.query.id2;
    const game = req.query.game;
    const data = req.query.data;
    

    modelUser.findOne({'id':user_id1}).then((user1,err1)=>{
        if(err1 || user1 == null){
            return res.status(400).send('usuario 1 não encontrado');
        }else{
            modelUser.findOne({'id':user_id2}).then((user2,err2)=>{
                if(err2 || user2 == null){
                    return res.status(400).send('usuario 2 não encontrado');
                }else{
                    const interest_usr1 = user1.interest_game.get(game)
                    const interest_usr2 = user2.interest_game.get(game)
                    const match_usr1 = user1.games_matched;
                    const match_usr2 = user2.games_matched;
                    if(interest_usr1 != null && interest_usr2 != null ){
                        if(interest_usr1.includes(data) && interest_usr2.includes(data)){
                            const usr1_match = {
                                'player':user2.name,
                                'email':user2.email,
                                'game_matched':game,
                                'game_time':data
                            }
                            const usr2_match = {
                                'player':user1.name,
                                'email':user1.email,
                                'game_matched':game,
                                'game_time':data
                            }
                            if(interest_usr1.length == 1){
                                user1.interest_game.delete(game)
                            }
                            if(interest_usr1.length == 1){
                                user2.interest_game.delete(game)
                            }
                            match_usr1.push(usr1_match);
                            user1.save((error1)=>{
                                if(error1){
                                    const message = error1.errmsg || error1.message;
                                    return res.status(400).send(message)
                                }
                            
                        });
                            match_usr2.push(usr2_match);
                            user2.save((error2)=>{
                                if(error2){
                                    const message = error2.errmsg || error2.message;
                                    return res.status(400).send(message)
                                }
                            
                        });

                        return res.status(200).send('jogo marcado')
                        }
                    }
                    else{
                        return res.status(403).send('não é possível fazer o match')
                    }
                }
            })        
        }
    })
 });

module.exports = router;