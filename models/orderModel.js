const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  meal: {
    type: mongoose.ObjectId,
    ref: 'Meal',
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: [true, 'Every order must belong to a user'],
  },
  cost: {
    type: Number,
    required: [true, 'Every order must have a total cost'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
orderSchema.pre(/^find/, function (next) {
  this.populate(['meal', 'user']);
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
