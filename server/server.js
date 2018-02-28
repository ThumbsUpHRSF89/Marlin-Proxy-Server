const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const reviewController = require('../db/models/reviews.js');

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/hackazonReviews');

app.use(bodyParser.json());
app.use('/product/:id/', express.static(path.join(__dirname, '/../public/')));
// app.use('/product/:id/', express.static(path.join(__dirname, '/../client/dist/images')));

app.get('/hooligan', (req, res) => {
  const { productID } = req.query;
  console.log(req.query);
  reviewController.findByProductID(productID, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Gotcha at port ${port}!\nLove,\nYour Server`);
});
