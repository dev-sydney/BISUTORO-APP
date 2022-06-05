const Review = require('./../models/reviewModel');
const CustomError = require('./../utils/customError');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const APIFeatures = require('./../utils/APIFeatures');

//CREATE
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { review, rating } = req.body;
  const doc = await Review.create({
    review,
    rating,
    meal: req.params.mealID,
    user: req.user._id,
  });
  res.status(200).json({
    status: 'success',
    data: { review: doc },
  });
});
//READ
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  let queryObj = { ...req.query };

  const query = new APIFeatures(Review.find(), queryObj)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();

  const reviews = await query.mongooseQuery;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: reviews,
  });
});

exports.getReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewID);

  if (!review)
    return next(new CustomError('No meal was found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { review },
  });
});

//UPDATE
exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  const { review, rating } = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.reviewID,
    { review, rating },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview)
    return next(
      new CustomError('could not find the review to update, invalid id', 404)
    );

  res.status(200).json({
    status: 'success',
    data: { updatedReview },
  });
});

//DELETE
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.reviewID);

  res.status(204).json({
    data: null,
  });
});
