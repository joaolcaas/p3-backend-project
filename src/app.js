var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('supertest')

app.use(morgan('tiny'));

/**
 * constantes
 */

const users = require('./data/user.json');
const games = require('./data/game.json');

const userRoute = require('./routes/user.route.js');
const gameRoute = require('./routes/game.route.js');

app.use('/user', userRoute);
app.use('/game', gameRoute);

app.use((req,res,next) => {
  next();
});

app.use('/showStatic',express.static(__dirname+'/static'));


//initial page
app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});

app.listen(8080,function(){
    console.log("Listening on port 8080")
});

module.exports=app