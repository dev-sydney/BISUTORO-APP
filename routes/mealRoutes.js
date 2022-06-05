const express = require('express');

const mealController = require('./../controllers/mealController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.authenticateUser);
//ALIASING
router.get(
  '/top-5-meals',
  mealController.getTopMeals,
  mealController.getAllMeals
);

router.get('/favourite-meals', mealController.getAllFavourites);

router
  .route('/')
  .post(
    authController.restrictAccessTo('manager', 'admin'),
    mealController.createMeal
  )
  .get(mealController.getAllMeals);

router
  .route('/:mealID')
  .get(mealController.getMeal)
  .patch(
    authController.restrictAccessTo('manager', 'admin'),
    mealController.updateMeal
  )
  .delete(
    authController.restrictAccessTo('manager', 'admin'),
    mealController.deleteMeal
  );

module.exports = router;
