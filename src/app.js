var express = require('express');
const appHttp = require('http').createServer((req,res) => res.send('ahoy    '));
var app = express();
var morgan = require('morgan');
var request = require('supertest')
var mongoose = require('mongoose')

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/ffdb',{'useNewUrlParser':true});

app.use(morgan('tiny'));

const users = require('./data/user.json');
const games = require('./data/game.json');

const userRoute = require('./user/user.route.js');
const gameRoute = require('./game/game.route.js');
const docsRoute = require('./docs/docs.route.js');
const matchRoute = require('./match/match.route.js')

const PORT = process.env.PORT || 8080;

app.use('/user', userRoute);
app.use('/game', gameRoute);
app.use('/docs',docsRoute);
app.use('/match',matchRoute);

app.use((req,res,next) => {
  next();
});

app.use('/showStatic',express.static(__dirname+'/static'));


//initial page
app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});

app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`)
});

module.exports=app