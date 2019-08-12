const express = require('express');

const router = express.Router();

const User = require('../models/user.model');

router.post('/', (req, res) => {
  const { username } = req.body;
  const user = new User({
    username,
  });
  user
    .save()
    .then(result => {
      const { username: dbUserName, _id } = result;
      res.json({ dbUserName, _id });
    })
    .catch(err => {
      if (err.code === 11000) {
        res.json({ error: `Username ${username} is already taken` });
      }
    });
});

module.exports = router;
