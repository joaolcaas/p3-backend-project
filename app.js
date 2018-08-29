var express = require('express');
var app = express();
var User = require('./models/user')

app.get('/',function(req,res){
    var response;
    try{
        if(req.query.name != undefined && req.query.email != undefined){
            var user = new User(req.query.name,req.query.email);
            response = 'hello ' + user.getName() + ' '+ user.getEmail();
            res.end(response)
        }
        throw err
    }catch(err){
            response = "Please, put the correct name or email"
            res.end(response);
        }
});


app.listen(8080,function(){
    console.log("Listening on port 8080")
});