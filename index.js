// Import express + Initialize app, PORT, routes, cors , morgan, path, mongoose
const express = require('express'),
  app = express(),
  routes = require('./src/routes'),
  cors = require('cors'),
  logger = require('morgan'),
  path = require('path'),
  mongoose = require('mongoose'),
  PORT = process.env.PORT || 8000;

// Require dotenv in order to pull in hidden config info
require('dotenv').config();

// Middlewares
app.use((req, res, next) => {
  console.log(`Time: `, Date());
  next();
});
app.use(logger('dev')); // Morgan
app.use(cors()); // Cors
app.use(express.json()); // Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve Static files from public directory ie. localhost:8000/images/cartoon.jpg

// Use routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to MongoDB');
  }
);

// Setup Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}/api/`);
});
