const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const request = require('request');
// const reviewController = require('../db/models/reviews.js');

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/hackazonReviews');

app.use(bodyParser.json());
app.use('/product/:id/', express.static(path.join(__dirname, '/../public/')));
// app.use('/product/:id/', express.static(path.join(__dirname, '/../client/dist/images')));

app.get('/api/:service', (req, res) => {
  const services = {
    'relatedProduct': 'http://localhost:8001/bundle.js',
    'reviewSection': 'http://localhost:8002/bundle.js',
    'productComparison': 'http://localhost:8003/bundle.js',
    'itemDetails': 'http://localhost:8004/bundle.js',
  }
  request(services[req.params.service], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      res.send(body);
    }
  });
});

app.listen(port, () => {
  console.log(`Gotcha at port ${port}!\nLove,\nYour Server`);
});
