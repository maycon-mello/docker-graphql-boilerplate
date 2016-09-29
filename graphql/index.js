const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://mongo:27017', (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mongoose');
});

app.get("/", (req, res) => res.send('GraphQL response'));

app.listen(PORT, () =>
 console.log(`GraphQL server running on port ${PORT}.);
);
