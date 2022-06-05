const User = require('./../models/userModel');

const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const APIFeatures = require('./../utils/APIFeatures');
const CustomError = require('../utils/CustomError');

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  let queryObj = { ...req.query };
  // Object.keys(req.query).forEach((el) => {
  //   return queryObj[el] * 1;
  // });
  const query = new APIFeatures(User.find(), queryObj)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();

  const users = await query.mongooseQuery;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const { userID } = req.params;

  const user = await User.findById(userID);

  if (!user) return next(new CustomError(`User doesn't exist`, 404));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new CustomError(`This route isn't meant for updating passwords`, 400)
    );
  const exlcudedFields = ['role'];
  let obj = { ...req.body };
  Object.keys(req.body).forEach((el) => {
    if (exlcudedFields.includes(el)) delete obj[el];
  });
  // console.log(obj);
  const user = await User.findByIdAndUpdate(req.user._id, obj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.getMe = catchAsyncErrors(async (req, res, next) => {
  req.params.userID = req.user._id;
  next();
});
