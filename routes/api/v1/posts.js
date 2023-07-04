const express = require('express');


const postApi = require('../../../controller/api/v1/posts_api');
const passport = require('passport');
const router = express.Router();



//router.post('/create',passport.checkAuthentication,postController.create);
router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destoy);
module.exports = router;