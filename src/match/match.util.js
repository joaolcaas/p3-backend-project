function findGame(user,game){
    var final = null;
    user.interest_games.forEach(function(element){
        if(element.game == game){
            final = element   
        }
    });
    return final;
}

function findHour(interest,data){
    var final = false;
    if(interest.data.includes(data)){
        final = true;
    }
    return final;
}

module.exports = {
    findGame,findHour
}