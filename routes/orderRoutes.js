const express = require('express');
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');
const router = express.Router();

router.post(
  '/checkout-session',
  authController.authenticateUser,
  orderController.createCheckoutSession
);

module.exports = router;
