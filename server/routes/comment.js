const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');


router.get('/:commentId/update', comment_controller.comment_update_get);

router.post('/:commentId/update', comment_controller.comment_update_post);

router.get('/:commentId/delete', comment_controller.comment_delete_get);

router.post('/:commentId/delete', comment_controller.comment_delete_post);

router.get('/:commentId/create', comment_controller.comment_delete_get);

router.post('/:commentId/create', comment_controller.comment_delete_post);

router.get('/:commentId', comment_controller.comment_detail);

module.exports = router;