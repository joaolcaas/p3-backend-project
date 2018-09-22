var mongoose = require('mongoose');
var validator = require('email-validator');
var Schema = mongoose.Schema;

const matchSchema = require('../match/match.model');
const interestSchema = require('../interest/interest.model');

var userSchema= new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    games_matched:{
        type:[mongoose.Schema.games_matched],
        required:false
    },
    
    password:{
        type:String,
        required:true
    },
    interest_game:{
        type:[mongoose.Schema.interest_game],
        required:false
    }
})

var User = mongoose.model('User',userSchema);
module.exports = User;