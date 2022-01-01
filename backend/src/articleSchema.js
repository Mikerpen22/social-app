const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required: [true, 'post id is required for an article']
    },
    author: {
        type: String,
        required: [true, 'author is required for an article']
    },
    text: {
        type: String,
        required: [true, 'body text is required for an article']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required for an article']
    },
    image: {
        // data: Buffer,
        // contentType: String
        type: String,
    },
    comments: {
        type: Array,
    },

})

module.exports = articleSchema;
