const express = require('express');

const homeController = require('../controller/home');

const router = express.Router();

console.log("Router loader");

router.get('/',homeController.home);
router.use('/user',require('./userRoute'));
module.exports = router;