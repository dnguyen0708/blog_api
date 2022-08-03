#! /usr/bin/env node

console.log('Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
const Blog = require('./models/blog');
const Comment = require('./models/comment');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const blogs = []
const comments = []

function BlogCreate(title,body,comments,cb){
    let blog = {
        title:title,
        body:body,
        date: new Date(Date.now()).toISOString(),
        comments: comments
    }
    const newBlog = new Blog(blog);
    newBlog.save(err =>{
        if(err){
            cb(err,null);
            return;
        }
        console.log("New Blog " + newBlog);
        cb(null,newBlog);
    });
}
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
function CommentCreate(author,body,cb){
    let comment = {
        author:author,
        body:body,
        date: new Date(Date.now()).toISOString()
    }
    const newComment = new Comment(comment);
    newComment.save(err =>{
        if(err){
            cb(err,null);
            return;
        }
        console.log("New Comment " + newComment);
        comments.push(newComment);
        cb(null,newComment);
    });
    
}

function createBlog(cb){
    async.parallel(
        [
            function(cb){
                BlogCreate('My First Blog','some cool text goes in here',comments.slice(0,3),cb);
            },
            function(cb){
                BlogCreate('My Second Blog',lorem,comments.slice(3),cb);
            }
        ],
        cb
    );
}

function createComment(cb){
    async.parallel(
        [
            function(cb){
                CommentCreate('Dan','some cool comment',cb);
            },
            function(cb){
                CommentCreate('Paul','hottest of hotboy',cb);
            },
            function(cb){
                CommentCreate('Alex','best manicurist in san fernando valley',cb);
            },
            function(cb){
                CommentCreate('Phillip','oh god',cb);
            },
            function(cb){
                CommentCreate('random','some cool comment from random',cb);
            },
            function(cb){
                CommentCreate('anon','anon is the best',cb);
            },
        ],
        cb
    );
}

async function resetDB(){
    await Blog.deleteMany({});
    await Comment.deleteMany({});
}

async.series([
    resetDB,
    createComment,
    createBlog
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



