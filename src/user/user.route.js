const express = require('express');
const router = new express.Router();
var validator = require('email-validator')
const user_util = require('../util/user.util')
const users = require('../data/user.json');
var cache = require('memory-cache');

const userModel = require('./user.model')

var newCache = new cache.Cache();
newCache.put('usuarios',users);

router.use((req,res,next) => {
    next();
});


/**
 * return all users
 */
router.get('/',function(req,res){
    userModel.find({}).then((users,err)=>{
        if(err){
            return res.status(400).send(err)
        }
        if (users === undefined || users.length == 0) {
            return res.status(404).send('Não existe nenhum usuario')
        }
        res.status(200).json(users);
    })
});

/**
 * add an user into users
 */
router.post('/',function(req,res){
    if(validator.validate(req.query.email.toLowerCase())){
        const user = {
            'id':users.length + 1,
            'name':req.query.name,
            'email':req.query.email.toLowerCase(),
            'password':req.query.password,
        }

        users.push(user);
        
        const newUser = new userModel(user)
        
        newUser.save((err)=>{
            if(err){
                const message = err.errmsg || err.message;
                return res.status(400).json(message);
            }
        return res.status(201).send('Cadastro feito com sucesso')
            
        });
        
    }
    else{
        return res.status(400).send('invalid email')
    }
})

/**
 * update user
 */
router.put('/:id',function(req,res){
    const user = user_util.findUser(users,req.params.id);
    if(user != null){
        user.name = req.query.name || user.name
        user.email = req.query.email || user.email
        user.games_matched = req.query.games_matched || user.games_matched
        return res.status(200).send('usuario atualizado')

    }else{
        return res.status(400).send('Não existe esse usuario para ser atualizado')
    }
});

/**
 * delete user
 */

router.delete('/:id',function(req,res){
    var index = users.indexOf(user_util.findUser(users,req.params.id));
    if(index > -1 ){
        users.splice(index,1)
        return res.status(204).send('usuario apagado')

    }else{
        return res.status(400).send('Não existe esse usuario para ser deletado')
    }
});

/**
 * return a specif user
 */
router.get('/:id',function(req,res){
    const user = user_util.findUser(users,req.params.id);
    if (user != null) {
      res.send(user);
    } else {
      res.status(404).send(`Usuario ${req.params.id} não encontrado`);
    }
});

/**
 * return all games matched from a specif user
 */
router.get('/:id/match',function(req,res){
    const user = user_util.findUser(users,req.params.id);
    if (user != null) {
      res.send(user.games_matched);
    } else {
      res.status(404).send(`Usuario ${req.params.id} não encontrado`);
    }

});

/**
 * list all users that has params.game
 */
router.get('/:game',function(req,res){
    const users_game = []
    users.forEach(function(element){
        if(element.games_matched.includes(req.params.game)){
            users_game.push(element)
        }
    });
    res.send(users_game)
});


module.exports = router;
