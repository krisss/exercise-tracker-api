const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/', (req, res) => {
  const { userId, description, duration, date } = req.body;
  User.findById(userId, (err, doc) => {
    if (err) return console.log(err);
    if (!doc) {
      res.json({ err: 'Unknown user ID' });
    }
    const exercise = {
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    };
    doc.exercises.push(exercise);
    doc
      .save()
      .then(result =>
        res.json({
          username: doc.username,
          description,
          duration,
          _id: userId,
          date: exercise.date,
        })
      )
      .catch(err => res.json({ error: 'Please enter required fields' }));
  });
});

module.exports = router;
