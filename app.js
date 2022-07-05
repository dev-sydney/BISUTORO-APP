const path = require('path');
//3RD PARTY MODULES
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//CUSTOM MODULES
const mealRouter = require('./routes/mealRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

const CustomError = require('./utils/customError');
const errorController = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/public')));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(
    new CustomError(`${req.originalUrl} cannot be found on this server!`, 400)
  );
});

app.use(errorController);
module.exports = app;
