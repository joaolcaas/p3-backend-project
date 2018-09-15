var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema= new Schema({
    
    players:{
        type:Array,
        required:[True,"Why no players?"]
    },
    
    game_matched:{
        type:String,
        required:True
    },

    game_time:{
        type:Date,
        required:[
            True,
            "Game's data is required"
        ]
    }

})

var Match = mongoose.model('Match',userSchema);
module.exports = Match;