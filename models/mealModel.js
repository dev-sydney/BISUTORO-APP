const mongoose = require('mongoose');
const slugify = require('slugify');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal must have a name'],
    unique: [true, 'Name of the meal must be unique'],
  },
  price: {
    type: Number,
    required: [true, 'Meal must have a price'],
  },
  ratingsAverage: {
    type: Number,
    max: [5.0, 'ratingsAverage cannot be more than 5.0'],
    min: [1, 'ratingsAverage cannot be less than 1.0'],
  },
  category: {
    type: String,
    required: [true, 'Meal must belong to a category'],
  },
  serving: Number,
  image: String,
  slug: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: true,
  },
});

mealSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

mealSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
