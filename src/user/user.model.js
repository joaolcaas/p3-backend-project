var mongoose = require('mongoose');
var validator = require('email-validator');
var Schema = mongoose.Schema;


var validatorEmail = function(email){
    if(validator.validate(email)){
        return True
    }
    return False
}

var userSchema= new Schema({

    name:{
        type:String,
        required:True
    },
    email:{
        type:String,
        unique:True,
        required:True,
        validate:{
            validator:validatorEmail,
            message:"Invalid email"
        }
    },
    password:{
        type:String,
        required:True
    },
    interest_game:{
        type:Array,
        required:False
    },
    user_kind:{
        type:String,
        required:True,
        enum:["Player","Admin"]
    }
})

var User = mongoose.model('User',userSchema);
module.exports = User;