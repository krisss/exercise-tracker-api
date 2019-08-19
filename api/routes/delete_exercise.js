const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.delete('/', (req, res) => {
  const { userId, exerciseId } = req.query;
  User.findById(userId, (err, doc) => {
    if (err) return console.log(err);
    if (!doc) return res.status(400).json({ error: 'User not found' });
    const exercise = doc.exercises.id(exerciseId);
    if (!exercise) {
      return res.status(400).json({ error: 'Exercise not found' });
    }
    exercise.remove();
    doc
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
