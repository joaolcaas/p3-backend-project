function findGame(user,game){
    if(user.interest_games[game]){
        return true
    }else{
        return false
    }
}

function findHour(interest_array,game,data){
    var final = false;
    if(interest_array[game].includes(data)){
        final = true;
    }
    return final;
}

module.exports = {
    findGame,findHour
}