const multer = require('multer');

const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const APIFeatures = require('./../utils/APIFeatures');
const CustomError = require('../utils/CustomError');

const Meal = require('../models/mealModel');
const User = require('./../models/userModel');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../client/public/img/users`);
  },
  filename: (req, file, cb) => {
    //user-_id-timestamp.jpg
    const fileExt = file.mimetype.split('/')[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${fileExt}`);
  },
});

/**
 * This function makes it possible so that we can only upload images
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        'Only image uploads allowed! try uploading an image instead.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.UploadPhoto = upload.single('photo');

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
  // console.log(req.file);
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new CustomError(`This route isn't meant for updating passwords`, 400)
    );
  const exlcudedFields = ['role'];
  let obj = { ...req.body };
  Object.keys(req.body).forEach((el) => {
    if (exlcudedFields.includes(el)) delete obj[el];
  });
  if (req.file) {
    obj.photo = req.file.filename;
  }
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
//ADDING A MEAL TO FAVOURITES
exports.addToFavourites = catchAsyncErrors(async (req, res, next) => {
  const { mealID } = req.params;
  if (req.user.favourites.includes(mealID))
    return next(
      new CustomError('Meal already belongs in your favourites', 400)
    );
  const favourites = [...req.user.favourites, mealID];

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { favourites },
    {
      new: true,
      validateModifiedOnly: true,
    }
  );
  if (!user)
    return next(
      new CustomError('Trouble updating favourites, please try again!', 404)
    );

  res.status(200).json({
    status: 'success',
  });
});
