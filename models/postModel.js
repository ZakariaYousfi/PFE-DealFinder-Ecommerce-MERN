const mongoose = require('mongoose');

// post model/Schema defines the structure of our post
const postSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        posterPic: {
            type: String,
        },
        posterName: {
            type: String,
        },
        postType: {
            type: String,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        addersToCart: {
            type: [String],
        },
        cord: {
            type: [String]
        },
        price: {
            type: String
        },
        title: {
            type: String
        },
        phonenumber: {
            type: String
        },
        description: {
            type: String,
            trim: true,
            maxlength: 5000
        },
        stock: {
            type: String
        },
        state: {
            type: String
        },
        availability: {
            type: String
        },
        tags: {
            type: String
        },
        comments: {
            type: [{
                commenterId: String,
                commenterUsername: String,
                text: String,
                timestamp: Number
            }],
            required: true
        },

    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model('post', postSchema);
module.exports = PostModel;