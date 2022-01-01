const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required for profile']
    },
    headline:{
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email address is required for profile']
    },
    zipcode: {
        type: String,
        required: [true, 'zipcode is required for profile']
    },
    dob: {
        type: String,
        required: [true, 'dob is required for profile']
    },
    avatar: {
        type: String,
    }
})

module.exports = profileSchema;
