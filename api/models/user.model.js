const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  exercises: [
    {
      description: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      date: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
