const express = require('express');

const homeController = require('../controller/home');

const router = express.Router();

console.log("Router loader");

router.get('/',homeController.home);

module.exports = router;