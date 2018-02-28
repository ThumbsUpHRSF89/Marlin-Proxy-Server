const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  product_id: Number,
  username: String,
  text: String,
  rating: Number,
  header: String,
  date: String,
});

const ReviewModel = mongoose.model('Review', reviewSchema);

// async function save(product, callback) {
//   console.log('in the save helper function here');
//   ReviewModel.create(product, callback);
// }
const saveAll = (dataArray, callback) => {
  console.log('in the save helper function here');
  ReviewModel.insertMany(dataArray, callback);
};

// for finding all object and setting them as state for ReviewSection
//    then within Review Section pass on state to ReviewList
//      from within ReviewList display 10 reviews.  button to show more.
const findByProductID = (id, callback) => {
  ReviewModel
    .find({ product_id: id })
    .exec(callback);
};

exports.saveAll = saveAll;
exports.findByProductID = findByProductID;
