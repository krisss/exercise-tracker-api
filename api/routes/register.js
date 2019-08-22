const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  if (!email)
    return res.status(400).json({ error: 'Please enter valid Email' });
  if (!username || !password)
    return res.status(400).json({ error: 'Please fill all the fields' });
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) return console.log(err.message);
    const user = new User({
      userName: username,
      email: email.toLowerCase(),
      hash,
    });
    user
      .save()
      .then(result => {
        const { userName: dbUserName, _id, exercises, email: dbEmail } = result;
        res
          .status(200)
          .json({ userName: dbUserName, _id, exercises, email: dbEmail });
      })
      .catch(err => {
        console.log(err.message);
        if (err.name === 'ValidationError') {
          return res.status(400).json({ error: 'Please enter a valid Email' });
        }
        if (err.code === 11000) {
          return res
            .status(400)
            .json({ error: `Email ${email} is already registered` });
        }
        res.status(400).json('Something went wrong');
      });
  });
});

module.exports = router;
