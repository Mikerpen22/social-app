const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  },
  avatar: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  email: {
    type: String,
  },
  headline: {
    type: String,
  },
  tel: {
    type: Number,
  },
  following: {
    type: Array,
  },

})

module.exports = userSchema;
