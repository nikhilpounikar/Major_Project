const express = require('express');
const passport = require('passport');

const commentsController = require('../controller/comment_controller');
const router = express.Router();



router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = router;