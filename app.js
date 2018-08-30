var express = require('express');
var app = express();
var User = require('./models/user')
var morgan = require('morgan');
var request = require('supertest')

app.use(morgan('tiny'));

function findProduct (id) {
    const product = users.find((item) => item.id === parseInt(id));
    return product;
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
    const product = findProduct(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send(`Item ${req.params.id} não encontrado`);
    }
});

//return all games matched from a specif user
app.get('/user/:id/match',function(req,res){
    const product = findProduct(req.params.id);
    if (product) {
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