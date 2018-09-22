var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema= new Schema({
    
    player:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    game_matched:{
        type:String,
        required:true
    },

    game_time:{
        type:Date,
        required:true
    }

})

var Match = mongoose.model('Match',matchSchema);
module.exports = Match;