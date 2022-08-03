const Blog = require('../models/blog');
const Comment = require('../models/comment');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.blog_list = function(req,res,next){
    Blog.find({})
        .populate('comments')
        .exec(function(err,blog_list){
        if(err) return next(err);
        res.json(blog_list);
    });
    
}

exports.blog_detail = function(req,res,next){
    Blog.findById(req.params.blogId)
        .populate('comments')
        .exec(function(err,blog){
            if(err) return next(err);
            res.json(blog);
        })
    // res.json({message:`blog with id ${req.params.blogId}`});
}

exports.blog_comment_post = [
    body('author','Author name must not be empty').trim().isLength({min:1}).escape(),
    body('body','comment field must not be empty').trim().isLength({min:1}).escape(),

    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({message:errors.array()});
            return;
        }
        
        const newComment = new Comment(
            {
                author:req.body.author,
                body:req.body.body,
                date: new Date(Date.now()).toISOString()
            }
        )
        Blog.findById(req.params.blogId)
            .populate('comments')
            .exec(async function(err,blog){
                if(err) return next(err);
                blog.comments.push(newComment);
                await newComment.save();
                await blog.save();
                res.json(blog);
            })
    }
]

exports.blog_create_post = [
    body('title','Author name must not be empty').trim().isLength({min:1}).escape(),
    body('body','comment field must not be empty').trim().isLength({min:1}).escape(),

    (req,res,next) =>{
        const errors = validationResult(req);

        const newBlog = new Blog({
            title: req.body.title,
            body: req.body.body,
            date: new Date(Date.now()).toISOString(),
            commets: []
        })

        if(!errors.isEmpty()){
            res.json({title:"Create Blog",blog:newBlog,errors:errors.array()});
            return;
        }

        newBlog.save(function(err){
            if(err) return next(err);
            res.json(newBlog);
        })
    }
]

exports.blog_update_post = [
    body('title','Author name must not be empty').trim().isLength({min:1}).escape(),
    body('body','comment field must not be empty').trim().isLength({min:1}).escape(),

    (req,res,next) =>{
        const errors = validationResult(req);

        const newBlog = new Blog({
            title: req.body.title,
            body: req.body.body,
            date: new Date(Date.now()).toISOString(),
            commets: [],
            _id:req.params.blogId
        })

        if(!errors.isEmpty()){
            res.json({title:"Update Blog",blog:newBlog,errors:errors.array()});
            return;
        }

        Blog.findByIdAndUpdate(req.params.blogId,newBlog,{},function(err){
            if(err) return next(err);
            res.json(newBlog);
        })
    }
]

exports.blog_delete_post = function(req,res,next){
    Blog.findByIdAndDelete(req.params.blogId,function(err){
        if(err) return next(err);
        res.json({message:"successfully deleted blog with id: "+req.params.blogId});
    })
}

