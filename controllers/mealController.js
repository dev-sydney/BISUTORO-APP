const Meal = require('./../models/mealModel');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');

exports.getTopMeals = (req, res, next) => {
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage';
  req.query.limit = 5;
  next();
};
//CREATING
// exports.createMeal = async (req, res, next) => {
//   try {
//     const { name, price, ratingsAverage, category } = req.body;

//     const meal = await Meal.create({
//       name,
//       price,
//       ratingsAverage,
//       category,
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         meal,
//       },
//     });
//   } catch (err) {
//     next(err);
//     // res.status(400).json({
//     //   status: 'fail',
//     //   error: err,
//     // });
//   }
// };

exports.createMeal = catchAsyncErrors(async (req, res, next) => {
  const { name, price, ratingsAverage, category } = req.body;

  const meal = await Meal.create({
    name,
    price,
    ratingsAverage,
    category,
  });

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});
//READING
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
