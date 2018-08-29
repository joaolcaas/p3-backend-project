var method = User.prototype;


function User(name,email){
    this.name = name;
    this.email = email;
}


method.getName = function(){
    return this.name;
}

method.getEmail = function(){
    return this.email;
}



module.exports = User;