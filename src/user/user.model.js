var mongoose = require('mongoose');
var validator = require('email-validator');
var Schema = mongoose.Schema;

var userSchema= new Schema({
    id:{
        type:Number,
        required:true
    },
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
        type:Map,
        of:Array,
        required: true,
        default: new Map()
    },
    
    role:{
        type:String,
        required:true,
        enum:['gamer','adm']
    }},
    {'versionKey': false})

var User = mongoose.model('User',userSchema);
module.exports = User;