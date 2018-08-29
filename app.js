var express = require('express');
var app = express();
var User = require('./models/user')
var morgan = require('morgan');
app.use(morgan('tiny'));

function findProduct (id) {
    const product = users.find((item) => item.id === parseInt(id));
    return product;
  }

app.use('/showStatic',express.static(__dirname+'/static'));

const users = [
    {
        'id': 1,
        'name': "João",
        'email': "joao.felipe@igor.com"
    },

    {
        'id':2,
        'name': "João2",
        'email': "joao.fe2lipe@igor.com"
}]


app.get('/',function(req,res){
    var response;
    try{
        if(req.query.name != undefined && req.query.email != undefined){
            var user = new User(req.query.name,req.query.email);
            response = 'hello ' + user.getName() + ' '+ user.getEmail();
            res.end(response)
        }
        throw err
    }catch(err){
            response = "Please, put the correct name or email"
            res.end(response);
        }
});


//return all users
app.get('/user',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(users))
});

//return a specif user
app.get('/user/:id',function(req,res){
    const product = findProduct(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send(`Item ${req.params.id} não encontrado`);
    }
});

//return all games matched from a specif user
app.get('/user/:id/match',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(users))
});

// return all games
app.get('/game',function(req,res){

});



app.listen(8080,function(){
    console.log("Listening on port 8080")
});