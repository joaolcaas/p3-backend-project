var express = require('express');
const appHttp = require('http').createServer((req,res) => res.send('ahoy'));
var morgan = require('morgan');
var request = require('supertest')
var mongoose = require('mongoose')
const session = require('express-session')
var passport = require('passport'),LocalStrategy = require('passport-local').Strategy;
const modelUser = require('./user/user.model')

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/ffdb',{'useNewUrlParser':true});


const app = express();
app.use(session({ secret: 'forfun', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())

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

app.use((req,res,next) => {
  next();
});

app.use('/showStatic',express.static(__dirname+'/static'));


app.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('Welcome to ForFunMatch!'))
});

passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ 'email': email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

app.get('/login',
  function(req, res){
    res.redirect('/login');
  });

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/authrequired', (req, res) => {
    if(req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n')
    } else {
      res.redirect('/')
    }
  })
/*
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
*/
app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`)
});


module.exports=app