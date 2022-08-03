const Comment = require('../models/comment');

exports.comment_detail = function(req,res,next){
    res.json({message: "comment detail"});
};

exports.comment_update_get = function(req,res,next){
    res.json({message: `get create comment with id ${req.params.commentId}` });
};

exports.comment_update_post = function(req,res,next){

    res.json({message: `post create comment with id ${req.params.commentId}` });
};

exports.comment_delete_get = function(req,res,next){
    res.json({message: `get updelete comment with id ${req.params.commentId}` });
};

exports.comment_delete_post = function(req,res,next){
    res.json({message: `post updelete comment with id ${req.params.commentId}` });
};

exports.comment_create_get = function(req,res,next){
    res.json({message: `get updating comment with id ${req.params.commentId}` });
};

exports.comment_create_post = function(req,res,next){
    res.json({message: `post updating comment with id ${req.params.commentId}` });
};