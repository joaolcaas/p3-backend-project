const express = require('express');
const router = new express.Router();
var validator = require('email-validator')
const user_util = require('../util/user.util')
var cache = require('memory-cache');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const auth = require('../auth/auth.service')

const modelUser = require('./user.model')


router.use((req,res,next) => {
    next();
});


/**
 * return all users
 */
router.get('/',function(req,res){
    modelUser.find({}).then((users,err)=>{
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
    const userCollec = modelUser.estimatedDocumentCount();
    
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.query.password,salt);

    req.query.password = hash


    if(validator.validate(req.query.email.toLowerCase())){
        userCollec.then((count)=>{
            const user = {
                'id':count + 1,
                'name':req.query.name,
                'email':req.query.email.toLowerCase(),
                'password':req.query.password,
                'role':req.query.role
        };
        const newUser = new modelUser(user)
        
        newUser.save((err)=>{
            if(err){
                const message = err.errmsg || err.message;
                res.status(400).send(message)
            }else{
                res.status(201).send('Cadastro feito com sucesso')
            }
            
        });
    })        
    }
    else{
        return res.status(400).send('invalid email')
    }
})

/**
 * update user
 */
router.put('/:id', auth.ensureAuthenticated, auth.authenticateById,function(req,res){
    modelUser.findOne({'id':req.params.id}).then((user,err)=>{
        if(user == null || err){
            return res.status(400).send('usuario não encontrado')
        }else{
            user.name = req.query.name || user.name
            user.email = req.query.email || user.email 
            user.password = req.query.password || user.password
            user.save((err)=>{
                if(err){
                    const message = err.errmsg || err.message;
                    res.status(400).send(message)
                }else{
                    res.status(201).send('Atualização feita com sucesso')
                }
                
            });
        }
    })
});

/**
 * delete user
 */
//https://mongoosejs.com/docs/schematypes.html#maps

router.delete('/:id', auth.ensureAuthenticated, auth.authenticateById,function(req,res){
    modelUser.deleteOne({'id':req.params.id}).then((report)=>{
        if(report.n == 0){
            return res.status(400).send('usuario não encontrado')
        }
        return res.status(200).send('usuario deletado com sucesso')
    });
});

/**
 * return a specif user
 */
router.get('/:id', auth.ensureAuthenticated, auth.authenticateById,function(req,res){
    modelUser.findOne({'id':req.params.id}).then((user,err)=>{
        if(err || user == null){
            res.status(404).send(`Usuario ${req.params.id} não encontrado`);
        }else{
            res.send(user);
        }
    });
});

/**
 * return all games matched from a specif user
 */
router.get('/:id/match', auth.ensureAuthenticated, auth.authenticateById,function(req,res){
    const user = user_util.findUser(users,req.params.id);
    if (user != null) {
      res.send(user.games_matched);
    } else {
      res.status(404).send(`Usuario ${req.params.id} não encontrado`);
    }

});



module.exports = router;
