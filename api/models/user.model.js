const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [isEmail],
  },
  hash: {
    type: String,
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
