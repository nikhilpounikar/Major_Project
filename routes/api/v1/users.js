const express = require('express');


const userApi = require('../../../controller/api/v1/users_api');
const router = express.Router();



//router.post('/create',passport.checkAuthentication,postController.create);
router.post('/create-session',userApi.createSession);
module.exports = router;