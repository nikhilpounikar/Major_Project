// gettting dependencies
const express = require('express');

// getting homeController
const homeController = require('../controller/homeController');

// getting router instance
const router = express.Router();

console.log("Router loader");

router.get('/',homeController.home);
router.use('/user',require('./userRoute'));



module.exports = router;