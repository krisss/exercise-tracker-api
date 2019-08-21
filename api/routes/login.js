const express = require('express');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const router = express.Router();

router.post('/', (req, res) => {
  const { userName, hash: password } = req.body;

  if (!isEmail(userName))
    return res.json({ error: 'Please enter valid Email' });
  User.findOne({ userName: userName.toLowerCase() }, (err, doc) => {
    if (err) return console.log(err.message);
    if (!doc)
      return res
        .status(400)
        .json({ error: 'No user found, please check your ID' });
    bcrypt.compare(password, doc.hash, function(err, response) {
      if (err) return console.log(err.message);
      if (!response)
        return res.status(400).json({ error: 'Invalid credentials' });
      return res.status(200).json({
        _id: doc._id,
        userName: doc.userName,
        exercises: doc.exercises,
      });
    });
  });
});

module.exports = router;
