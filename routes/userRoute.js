const express = require('express');
const passport = require('passport');

const userController = require('../controller/userController');

const router = express.Router();

router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

// Using manual Authenticatio
//router.post('/create-session',userController.createSession);

// using Passport authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),userController.createSession)


module.exports = router;