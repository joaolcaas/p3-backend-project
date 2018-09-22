function findUser (users,id) {
    var final = null
    users.forEach(function(element){
        if(element.id == parseInt(id)){
            final = element
        }
    });
    return final
}

module.exports = {
    findUser
}
