const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/', (req, res) => {
  const { userId, duration, date } = req.body;
  let { description } = req.body;
  User.findById(userId, (err, doc) => {
    if (err) return console.log(err);
    if (!doc) {
      res.json({ err: 'Unknown user ID' });
    }
    description = description.charAt(0).toUpperCase() + description.slice(1);
    const exercise = {
      description,
      duration,
      date,
    };
    doc.exercises.push(exercise);
    doc.exercises.sort((a, b) => (a.date > b.date ? -1 : 1));
    doc
      .save()
      .then(result =>
        res.json({
          userName: result.userName,
          _id: result._id,
          exercises: result.exercises,
        })
      )
      .catch(err => res.json({ error: 'Please enter required fields' }));
  });
});

module.exports = router;
