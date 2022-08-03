const express = require('express');
const passport = require('passport');
const router = express.Router();
const blog_controller = require('../controllers/blogController');

router.get('/', blog_controller.blog_list);

router.post('/newblog', passport.authenticate('jwt', { session: false }), blog_controller.blog_create_post);

router.post('/:blogId/newcomment', passport.authenticate('jwt', { session: false }), blog_controller.blog_comment_post);

router.post('/:blogId/update', passport.authenticate('jwt', { session: false }), blog_controller.blog_update_post);

router.post('/:blogId/delete', passport.authenticate('jwt', { session: false }), blog_controller.blog_delete_post);

router.get('/:blogId', blog_controller.blog_detail);


module.exports = router;
