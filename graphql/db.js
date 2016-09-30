const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017', (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mongoose');
});
