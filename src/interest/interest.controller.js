const modelUser = require('../user/user.model');

exports.getinterst = (req,res,next)=>{
    const user_id = req.params.id;

    modelUser.findOne({'id':user_id}).then((user,err)=>{
        if(err || user == null){
            return res.status(400).send('usuario não encontrado')
        }else{
            if(user.interest_game != null){
                return res.status(200).send(user.interest_game)
            }else{
                return res.status(400).send('voce não tem jogos de interesse')
            }
        }
    })
}

exports.postinterest = (req,res,next)=>{
    const user_id = req.params.id;
    const game = req.query.game;
    const data = req.query.data;

    modelUser.findOne({'id':user_id}).then((user,err)=>{
        if(err || user == null){
            return res.status(400).send('usuario não encontrado')
        }else{
            if(user.interest_game.get(game)){
                if(user.interest_game.get(game).includes(data)){
                    res.status(400).send('esse horário de jogo já está marcado')
                }else{
                    user.interest_game.get(game).push(data);
                    user.save((error)=>{
                        if(error){
                            const message = error.errmsg || error.message;
                            res.status(400).send(message)
                        }else{
                            res.status(201).send('Atualização feita com sucesso')
                        }
                    
                });
            }
            }
            else{
                user.interest_game.set(game,[data])
                user.save((error)=>{
                    if(error){
                        const message = error.errmsg || error.message;
                        res.status(400).send(message)
                    }else{
                        res.status(201).send('Atualização feita com sucesso')
                    }
                    
                });
            }        
        }
    })
}