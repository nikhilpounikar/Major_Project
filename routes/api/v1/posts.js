const express = require('express');


const postApi = require('../../../controller/api/v1/posts');
const router = express.Router();



//router.post('/create',passport.checkAuthentication,postController.create);
router.get('/',postApi.index);

module.exports = router;