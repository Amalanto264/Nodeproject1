const express = require('express')
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
const userController = require('../controller/user')
const passport = require('passport')

router.get('/login',userController.loginuser)
router.get('/register',userController.registeruser)

router.post('/register',userController.postRegister)

//router.post('/login',userController.postLogin)
router.post('/login',passport.authenticate('local',{
    successRedirect:'/', 
    failureRedirect:'/login'
}))

module.exports = router;