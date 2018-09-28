var express = require('express');
const appHttp = require('http').createServer((req,res) => res.send('ahoy'));
var morgan = require('morgan');
var request = require('supertest')
var mongoose = require('mongoose')
const modelUser = require('./user/user.model')
require('./passport');
const auth = require('./auth');


mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/ffdb',{'useNewUrlParser':true});


const app = express();


app.use(morgan('tiny'));

const userRoute = require('./user/user.route.js');
const gameRoute = require('./game/game.route.js');
const docsRoute = require('./docs/docs.route.js');
const matchRoute = require('./match/match.route.js')
const interestRoute = require('./interest/interest.route.js');

const PORT = process.env.PORT || 3000;

app.use('/user', userRoute);
app.use('/game', gameRoute);
app.use('/docs',docsRoute);
app.use('/match',matchRoute);
app.use('/interest',interestRoute);
app.use('/auth', auth);

app.use((req,res,next) => {
  next();
});

app.use('/showStatic',express.static(__dirname+'/static'));


app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});

app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`)
});


module.exports=app