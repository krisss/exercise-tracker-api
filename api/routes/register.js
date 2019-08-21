const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

router.post('/', (req, res) => {
  const { userName, hash: password } = req.body;
  if (!userName) return res.json({ error: 'Please enter valid Email' });
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) return console.log(err.message);
    const user = new User({
      userName: userName.toLowerCase(),
      hash,
    });
    user
      .save()
      .then(result => {
        const { userName: dbUserName, _id, exercises } = result;
        res.json({ userName: dbUserName, _id, exercises });
      })
      .catch(err => {
        console.log(err);
        if (err.name === 'ValidationError') {
          return res.status(400).json({ error: 'Please enter a valid Email' });
        }
        if (err.code === 11000) {
          return res
            .status(400)
            .json({ error: `Email ${userName} is already registered` });
        }
        res.status(400).json('Something went wrong');
      });
  });
});

module.exports = router;
