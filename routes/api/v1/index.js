// gettting dependencies
const express = require('express');


// getting router instance
const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));
module.exports = router;