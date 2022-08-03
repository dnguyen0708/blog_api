const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required:true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    }
);

BlogSchema.virtual('url').get(function(){
    return '/blog/' + this._id;
});

BlogSchema.post('findOneAndDelete', async function (blog) {
    if (blog) {
        await Comment.deleteMany({
            _id: { $in: blog.comments }
        })
    }
})

module.exports = mongoose.model('Blog',BlogSchema);