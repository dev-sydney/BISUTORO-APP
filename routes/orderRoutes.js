const express = require('express');
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');
const router = express.Router();

router.use(authController.authenticateUser);

router.post('/checkout-session', orderController.createMealsCheckoutSession);

router.post(
  '/tables/checkout-session',
  orderController.createTablesCheckoutSession
);
module.exports = router;
