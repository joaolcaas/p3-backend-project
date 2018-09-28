function checkMatch(user1,user2,data,game){
    var retorno = false;
    const interest_usr1 = user1.interest_game.get(game)
    const interest_usr2 = user2.interest_game.get(game)

    if(interest_usr1 != null && interest_usr2.interest_game.get(game) != null ){
        if(interest_usr1.includes(data) && interest_usr2.includes(data)){
            retorno = true;
        }
    }
    return retorno;
  
}

module.exports = {
   checkMatch
}