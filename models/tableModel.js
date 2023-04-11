const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Every table must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'Every table must have a price'],
  },
  seating: {
    type: Number,
    required: [true, 'Every Table must have some seats'],
  },
  ratingsAverage: {
    type: Number,
    max: [5.0, 'ratingsAverage cannot be more than 5.0'],
    default: 0,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  photo: String,
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
