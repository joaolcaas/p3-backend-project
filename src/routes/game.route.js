const express = require('express');
const router = new express.Router();

const games = require('../data/game.json');

router.use((req,res,next) => {
    next();
});
/**
 * return all games
 */
router.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify(games))
});
module.exports = router;