const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Must have a review'],
  },
  rating: {
    type: Number,
    min: [1, 'A rating cannot be less than 1'],
    max: [5, 'A rating cannot be above 5'],
  },
  meal: {
    type: mongoose.ObjectId,
    ref: 'Meal',
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
reviewSchema.pre(/^find/, function (next) {
  this.populate(['user', 'meal']);
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
