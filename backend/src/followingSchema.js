const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username is required for following schema']
    },
    following:{
        type: Array,
        required: [true, 'everyone should at least follow one person(themselves)']
    }

})

module.exports = followingSchema;
