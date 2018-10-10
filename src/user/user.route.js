const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth.service')
const controller = require('./user.controller');

router.get('/',controller.allusers);


router.post('/',controller.postuser);


router.put('/:id',auth.ensureAuthenticated,auth.authenticateById,controller.updateuser);



router.delete('/:id',auth.ensureAuthenticated,auth.authenticateById,controller.deleteuser);



router.get('/:id',auth.ensureAuthenticated,auth.authenticateById,controller.getspecifuser);

module.exports = router;
