const express = require('express');
const router = new express.Router();

router.use((req,res,next) => {
    next();
});
/**
 * return all games
 */
router.get('/',function(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify('oi'))
});
module.exports = router;