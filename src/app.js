var express = require('express');
var morgan = require('morgan');
var request = require('supertest')
var mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const HALF_HOUR = 1800000;


mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/ffdb',{'useNewUrlParser':true});

const app = express();
app.use(morgan('tiny'));

require('./auth/passport')(passport);
app.use(session({'secret': 'secret',
  'cookie': {'maxAge': HALF_HOUR},
  'resave': false,
  'saveUninitialized': false}));
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require('./user/user.route.js');
const gameRoute = require('./game/game.route.js');
const docsRoute = require('./docs/docs.route.js');
const matchRoute = require('./match/match.route.js')
const interestRoute = require('./interest/interest.route.js');
const loginRoute = require('./auth/login.route.js');
const PORT = process.env.PORT || 3000;

app.use('/user', userRoute);
app.use('/game', gameRoute);
app.use('/docs',docsRoute);
app.use('/match',matchRoute);
app.use('/interest',interestRoute);
app.use('/login',loginRoute);

app.use((req,res,next) => {
  next();
});

let corsOptions = {};

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'production') {
  corsOptions = {
    'origin': 'http://localhost:3000',
    'optionsSuccessStatus': 200
  };
  console.log('The system is running in production');
} else {
  console.log('The system is not running in production');
}

app.use(cors(corsOptions));
app.use('/showStatic',express.static(__dirname+'/static'));


app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});



app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`)
});


module.exports=app