const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

const newUserRoutes = require('./api/routes/register');
const loginRoute = require('./api/routes/login');
const addExerciseRoutes = require('./api/routes/add_exercise');
const getExerciseRoutes = require('./api/routes/get_exercise');
const deleteExerciseRoutes = require('./api/routes/delete_exercise');

app.use('/api/new-user', newUserRoutes);
app.use('/api/login', loginRoute);
app.use('/api/exercise/add', addExerciseRoutes);
app.use('/api/exercise/log', getExerciseRoutes);
app.use('/api/exercise/delete', deleteExerciseRoutes);

// Not found middleware
app.use((req, res, next) => next({ status: 404, message: 'not found' }));

const listener = app.listen(process.env.PORT || 3003, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
