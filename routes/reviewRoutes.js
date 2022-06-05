const express = require('express');

const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.authenticateUser);

router
  .route('/')
  .get(
    authController.restrictAccessTo('admin', 'manager'),
    reviewController.getAllReviews
  );

router
  .route('/:mealID')
  .post(authController.restrictAccessTo('user'), reviewController.createReview);

router
  .route('/:reviewID')
  .get(reviewController.getReview)
  .patch(authController.restrictAccessTo('user'), reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
