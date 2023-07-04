// gettting dependencies
const express = require('express');


// getting router instance
const router = express.Router();

router.use('/v1',require('./v1'))

module.exports = router;