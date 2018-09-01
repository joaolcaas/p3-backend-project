var express = require('express');
var app = express();
var User = require('./models/user')
var morgan = require('morgan');
var request = require('supertest')
var validator = require('email-validator')

app.use(morgan('tiny'));

function findProduct (id) {
    var final = null
    users.forEach(function(element){
        if(element.id == parseInt(id)){
            final = element
        }
    });
    return final
}

app.use('/showStatic',express.static(__dirname+'/static'));

const games = ['dota2','CS GO','artifact','lol'];

const users = [
    {
        'id': 1,
        'name': "João",
        'email': "joao.felipe@igor.com",
        'games_matched':['dota2','artifact']
    },

    {
        'id':2,
        'name': "João2",
        'email': "joao.fe2lipe@igor.com",
        'games_matched':['CS GO']
}]

//add a user
app.post('/add/user',function(req,res){
    
    if(validator.validate(req.query.email)){
        users.push({
            'id':users.length + 1,
            'name':req.query.name,
            'email':req.query.email,
            'games_matched':[req.query.games_matched]
        });
        return res.status(200).send('Cadastro feito com sucesso')
    }

    else{
        return res.status(400).send('error')
    }
})

//update user
app.put('/update/user',function(req,res){
    const user = findProduct(req.query.id);
    if(user != null){
        user.name = req.query.name || user.name
        user.email = req.query.email || user.email
        user.games_matched = req.query.games_matched || user.games_matched
        return res.status(200).send('usuario atualizado')

    }else{
        return res.status(400).send('Não existe esse usuario para ser atualizado')
    }
});

//delete a user
app.delete('/delete/user/:id',function(req,res){
    const user = findProduct(req.params.id);
    if(user != null){
        users.pop(user)
        return res.status(200).send('usuario apagado')

    }else{
        return res.status(400).send('Não existe esse usuario para ser deletado')
    }
});

//initial page
app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});


//return all users
app.get('/user',function(req,res){
    /*
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(users))
    */
   res.status(200).json({users})
    
});

request(app)
  .get('/user')
  .expect("Content-Type", /json/)
  .expect("Content-Length", '186')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });


//return a specif user
app.get('/user/:id',function(req,res){
    const user = findProduct(req.params.id);
    if (user != null) {
      res.send(user);
    } else {
      res.status(404).send(`Usuario ${req.params.id} não encontrado`);
    }
});

//return all games matched from a specif user
app.get('/user/:id/match',function(req,res){
    const user = findProduct(req.params.id);
    if (user != null) {
      res.send(product.games_matched);
    } else {
      res.status(404).send(`Usuario ${req.params.id} não encontrado`);
    }

});

// return all games
app.get('/game',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(games))
});

app.listen(8080,function(){
    console.log("Listening on port 8080")
});

module.exports=app