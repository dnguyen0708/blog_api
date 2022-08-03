const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
/* GET home page. */
router.post('/sign-up', user_controller.user_create_post);

router.post('/login', user_controller.user_login_post);

router.post('/logout', user_controller.user_logout_post);
module.exports = router;
