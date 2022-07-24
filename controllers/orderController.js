// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Meal = require('./../models/mealModel');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const CustomError = require('./../utils/customError');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
/**
 * Creates the line items needed for the checkout session
 * @param {Array} meals An array of meal docs
 * @returns an Array
 */
const createLineItems = (meals) =>
  meals.map((el) => ({
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: el.price * 100,
      product_data: {
        name: el.name,
        images: [`https://www.natours.dev/img/tours/tour-2-cover.jpg`],
      },
    },
  }));

exports.createCheckoutSession = catchAsyncErrors(async (req, res, next) => {
  //Get the IDs of ordered meals from the mealIDs query object,(which its value is a string)
  const mealIDS = req.query.mealIds.split(','); //splitin the IDs into an array
  //Getting the meals using the array of  mealIDs
  const meals = await Meal.find({ _id: { $in: mealIDS } });

  let line_items = createLineItems(meals);
  //create a checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `http://127.0.0.1:3000/`,
    cancel_url: `http://127.0.0.1:3000/me`,
    customer_email: req.user.email,
    line_items,
    client_reference_id: req.query.mealIds,
  });
  //Send the session as a response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.getIDS = (req, res, next) => {
  console.log(req.query);
  console.log('JJIIII');
};

//TODO:
//change the data structure before sending the request
//Create an array of ids from the request
//find all meals that have ids in that array
//
