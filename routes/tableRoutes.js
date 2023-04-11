const express = require('express');
const tableController = require('./../controllers/tableController');
const authController = require('./../controllers/authController');
const router = express.Router();

module.exports = router;
router.use(authController.authenticateUser);

router
  .route('/')
  .post(
    authController.restrictAccessTo('manager', 'admin'),
    tableController.multerUpload,
    tableController.createTable
  )
  .get(authController.restrictAccessTo('user'), tableController.getAllTables);
