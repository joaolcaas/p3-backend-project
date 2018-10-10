const express = require('express');
const router = new express.Router();
const modelGame = require('./game.model');
const auth = require('../auth/auth.service')

router.use((req,res,next) => {
    next();
});
/**
 * return all games
 */
router.get('/',function(req,res){
    modelGame.find({}).then((games,err)=>{
        if(err){
            return res.status(400).send(err)
        }
        if (games === undefined || games.length == 0) {
            return res.status(404).send('Não existe nenhum game cadastrado');
        }
        res.status(200).json(games);
    })
    
});

router.post('/',auth.ensureAuthenticated,auth.authenticateByRole,function(req,res){
    const gameCollec = modelGame.estimatedDocumentCount();

    gameCollec.then((count)=>{
        const game = {
            'id':count + 1,
            'name':req.query.name
        };
        const newGame = new modelGame(game);

        newGame.save((err)=>{
            if(err){
                const message = err.errmsg || err.message;
                res.status(400).send(message)
            }else{
                res.status(201).send('Cadastro feito com sucesso')
            }
        });


    });

});
module.exports = router;