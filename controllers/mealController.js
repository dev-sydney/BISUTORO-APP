const multer = require('multer');
const CustomError = require('../utils/CustomError');

const Meal = require('./../models/mealModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');

exports.getTopMeals = (req, res, next) => {
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,image,_id';
  req.query.limit = 5;
  next();
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../client/public/img/meals`);
  },
  filename: (req, file, cb) => {
    //meal-_id-.png;
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        'Only image uploads allowed, try uploading an image instead',
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

exports.multerUpload = upload.single('image');

exports.createMeal = catchAsyncErrors(async (req, res, next) => {
  const { name, price, ratingsAverage, category, serving } = req.body;
  // console.log(req);
  const meal = await Meal.create({
    name,
    price,
    ratingsAverage,
    category,
    serving,
    image: req.file.filename,
  });

  res.status(200).json({
    status: 'success',
    successMsg: 'Meal added successfully :)',
  });
});
//READING
exports.putOnSale = (req, res, next) => {
  if (req.user.role === 'user') {
    req.query.isOnSale = true;
  }
  next();
};
exports.getAllMeals = catchAsyncErrors(async (req, res, next) => {
  let queryObj = { ...req.query };
  // Object.keys(req.query).forEach((el) => {
  //   return queryObj[el] * 1;
  // });
  const query = new APIFeatures(Meal.find(), queryObj)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();

  const meals = await query.mongooseQuery;

  res.status(200).json({
    status: 'success',
    results: meals.length,
    data: { meals, user: req.user },
  });
});

exports.getMeal = catchAsyncErrors(async (req, res, next) => {
  const meal = await Meal.findById(req.params.mealID);

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

//UPDATING
exports.updateMeal = catchAsyncErrors(async (req, res, next) => {
  const meal = await Meal.findByIdAndUpdate(req.params.mealID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!meal)
    return next(
      new CustomError('Trouble updating the meal,please try again', 400)
    );

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});
//DELETING
exports.deleteMeal = catchAsyncErrors(async (req, res, next) => {
  await Meal.findByIdAndDelete(req.params.mealID);

  res.status(204).json({
    data: null,
  });
});

//FAVOURITE MEALS
exports.getAllFavourites = catchAsyncErrors(async (req, res, next) => {
  //An Array of ids of all the users favorites
  const favouritesIds = req.user.favourites;
  const favoriteMeals = await Meal.find({ _id: { $in: favouritesIds } });

  res.status(200).json({
    status: 'success',
    meals: favoriteMeals.length,
    data: favoriteMeals,
  });
});

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Meal.aggregate([
    {
      $group: {
        _id: '$category',
        results: { $sum: 1 },
      },
    },
    {
      $addFields: { categoryName: '$_id' },
    },
    {
      $unset: '_id',
    },
  ]);
  // console.log(categories);
  res.status(200).json({
    status: 'sucesss',
    categories,
  });
});
