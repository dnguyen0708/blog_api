const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        author:{
            type: String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        date:{
            type: Date,
            required: true
        }
    }
)

CommentSchema.virtual('url').get(function(){
    return '/comment/'+this._id;
});

module.exports = mongoose.model('Comment',CommentSchema);