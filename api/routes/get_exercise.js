const express = require('express');
const moment = require('moment');
const User = require('../models/user.model');

const router = express.Router();

router.get('/', (req, res) => {
  const { userId, limit, from, to } = req.query;
  if (!userId) return res.json({ error: 'Please enter user ID' });
  User.findById(userId, (err, doc) => {
    if (err) return console.log('err');
    if (!doc) return res.json({ error: 'No user found, please check your ID' });
    let result = doc.exercises;
    const hasExercise = result.length > 0;
    result = result.filter(exercise =>
      moment(exercise.date).isBetween(from || '1970-01-01', to)
    );
    if (limit) {
      result = result.slice(0, limit);
    }
    res.json({
      _id: doc._id,
      userName: doc.userName,
      exercises: result,
      hasExercise,
    });
  });
});

module.exports = router;
