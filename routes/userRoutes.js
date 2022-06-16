const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signIn);
router.get('/signout', authController.signOut);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPasssword);

router.use(authController.authenticateUser);

router.route('/me').get(userController.getMe, userController.getUser);

router
  .route('/update-me')
  .patch(userController.UploadPhoto, userController.updateUser);

router.patch('/favourite-meals/:mealID', userController.addToFavourites);

router.patch('/checkoutRoute', authController.routeTester); //FOR USER UPDATING HIS/HER OWN PASSWORD

router
  .route('/:userID')
  .get(userController.getUser)
  .patch(userController.updateUser);

router.use(authController.restrictAccessTo('manager', 'admin'));
router.get('/', userController.getAllUsers);

module.exports = router;
