const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);

// app.get('/', (req, res) => res.send('App is live''));

// Routes //
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/medications', require('./routes/medRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/symptoms', require('./routes/symptomRoutes'));
app.use('/api/moods', require('./routes/moodRoutes'));
app.use('/api/pain', require('./routes/painRoutes'));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}.`));