const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var gameSchema= new Schema({

    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    }},
    {'versionKey': false})

var Game = mongoose.model('Game',gameSchema);
module.exports = Game;