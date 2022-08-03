const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RefreshTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);