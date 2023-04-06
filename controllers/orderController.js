// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Meal = require('./../models/mealModel');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');
const CustomError = require('./../utils/customError');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});
const Stripe = require('stripe');
const stripe = Stripe(
  'sk_test_51KtrcXHQab9KuPl1ZCyd7Ww74V0h8tFcZjVB8WgFvMwxTAIVYr6B80Iv32mKH1VeyQ10FP5Vucq80d2KsENe7aOL00MF7nRM1T'
);
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
/**
 * Creates the line items needed for the checkout session
 * @param {Array} meals An array of meal docs
 * @returns an Array
 */
const createLineItems = (cartItems) =>
  cartItems.map((item) => ({
    quantity: item.qty,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [`https://www.natours.dev/img/tours/tour-2-cover.jpg`],
      },
    },
  }));

exports.createCheckoutSession = catchAsyncErrors(async (req, res, next) => {
  //Get the IDs of ordered meals from the mealIDs query object,(which its value is a string)
  // const mealIDS = req.query.mealIds.split(','); //splitin the IDs into an array
  //Getting the meals using the array of  mealIDs
  // const meals = await Meal.find({ _id: { $in: mealIDS } });
  //req.body.cartItems.map(item=>item._id).join(',')
  let line_items = createLineItems(req.body.cartItems);
  //create a checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `http://localhost:3000/meals`,
    cancel_url: `http://localhost:3000/cart`,
    customer_email: req.user.email,
    line_items,
    client_reference_id: req.body.cartItems.map((item) => item._id).join(','),
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
