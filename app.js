var express = require('express');
var app = express();
var User = require('./models/user')

app.get('/:nome/:email',function(req,res){
    var response;
    console.log(req.params)
    try{
        if(req.params['nome'] != undefined && req.params['email'] != undefined){
            var user = new User(req.params['nome'],req.params['email']);
            response = 'hello ' + user.getName() + ' '+ user.getEmail();
            res.end(response)
        }
    }catch(err){
            response = "Please, put the correct name or email"
            res.end(response);
        }
});

app.get('/')

app.listen(8080,function(){
    console.log("Listening on port 8080")
});