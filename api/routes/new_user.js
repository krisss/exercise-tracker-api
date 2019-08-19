const express = require('express');

const router = express.Router();

const User = require('../models/user.model');

router.post('/', (req, res) => {
  const { userName } = req.body;
  if (!userName) return res.json({ error: 'Please Enter Username' });
  const user = new User({
    userName,
  });
  user
    .save()
    .then(result => {
      const { userName: dbUserName, _id, exercises } = result;
      res.json({ userName: dbUserName, _id, exercises });
    })
    .catch(err => {
      console.log(err);
      if (err.code === 11000) {
        res.json({ error: `Username ${userName} is already taken` });
      }
    });
});

module.exports = router;
