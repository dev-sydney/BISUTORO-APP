const fs = require('fs');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Meal = require('./../models/mealModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');

dotenv.config({ path: './config.env' });

//GETTING THE DOCS(JS OBJECTS) FROM THE JSON FILES
const meals = JSON.parse(
  fs.readFileSync(`${__dirname}/data/meals.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);

//SETTING THE DB CONNECTION STRING
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!✅🌿'));

const importDevData = async () => {
  try {
    // await User.create(users);
    await Meal.create(meals);
    // await Review.create(reviews);

    console.log('Data imported successfully!👍🏽');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteDevData = async () => {
  try {
    await Meal.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();

    console.log('Data deleted successfully!👍🏽');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importDevData();
} else if (process.argv[2] === '--delete') {
  deleteDevData();
}
