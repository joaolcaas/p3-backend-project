var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var gameSchema= new Schema({

    id:{
        type:int,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

var Game = mongoose.model('Game',gameSchema);
module.exports = Game;