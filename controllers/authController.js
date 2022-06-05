const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const APIFeatures = require('../utils/APIFeatures');
const CustomError = require('../utils/CustomError');
const Email = require('./../utils/email');
const res = require('express/lib/response');

/**
 *
 * @param {String} inputPassword Password recieved from the request body that will be compared
 * @param {String} dbPassword The encrypted password we wanna compare the inputted password to
 * @returns {Promise} its resolved value is a boolean
 */
const checkPasswordValidility = async (inputPassword, dbPassword) =>
  await bcrypt.compare(inputPassword, dbPassword);

/**
 *
 * @param {Object} user  this is the user doc from which we obtain the id user's ._id property
 * @returns {String}  a jwt token
 */
const signJWT = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

/**
 * This function primarily sets the cookie, but it also signs the JSON webToken
 * @param {Object} user The user document
 * @param {Object} res The response object
 */
const createSendTokenCookie = (user, res) => {
  const token = signJWT(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JSON_WT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jsonWebToken', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
    token,
  });
};
/////////////////////////////////////////////////////////////////////////////////////

exports.signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  createSendTokenCookie(user, res);

  //Signing a new JSON web token
  // let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES,
  // });

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     user,
  //   },
  //   token,
  // });
});

exports.signIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new CustomError('Please provide an email and password!', 400));

  const [user] = await User.find({ email });

  if (!user || !(await checkPasswordValidility(password, user.password)))
    return next(new CustomError('Incorrect password or email', 404));

  createSendTokenCookie(user, res);
});
exports.signOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie('jsonWebToken', 'cookieOverwritingText', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
});
exports.authenticateUser = catchAsyncErrors(async (req, res, next) => {
  let payload;
  //console.log('HERE HERE');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //console.log(req.headers.authorization);
    payload = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jsonWebToken) {
    payload = req.cookies.jsonWebToken;
  }

  if (!payload)
    return next(
      new CustomError(
        `Oops, you'll have to be logged in to access this route`,
        403
      )
    );

  const decodedPayload = await promisify(jwt.verify)(
    payload,
    process.env.JWT_SECRET
  );
  //console.log(decodedPayload);

  const loggedInUser = await User.findById(decodedPayload.id);
  if (!loggedInUser)
    return next(new CustomError('This user no longer exists', 404));

  if (loggedInUser.didPasswordChange(decodedPayload.iat))
    return next(
      new CustomError(
        'Password has recently changed. Try logging in again.',
        400
      )
    );
  req.user = loggedInUser;
  next();
});

exports.restrictAccessTo =
  (...roles) =>
  (req, res, next) => {
    if (req.query.meal) return next();

    if (!roles.includes(req.user.role))
      return next(
        new CustomError(
          'You do not have permission to perform this action',
          401
        )
      );
    next();
  };

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new CustomError('Incorrect email, try again', 404));

  const resetToken = user.setResetPasswordToken();
  await user.save({ validateModifiedOnly: true });

  const resetPasswordURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const emailMsg = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${resetPasswordURL}.\nIf you didn't forget your password, please ignore this email`;
  try {
    await new Email(user, emailMsg).sendMail();

    res.status(200).json({
      status: 'success',
      message: 'Email sent sucessfully',
    });
  } catch (err) {
    return next(
      new CustomError('Error sending Email, please try again...', 500)
    );
  }
});

exports.resetPasssword = catchAsyncErrors(async (req, res, next) => {
  const token = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresIn: { $gt: Date.now() },
  });
  //console.log(user);
  if (!user)
    return next(new CustomError('Invalid token or expired token', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresIn = undefined;

  await user.save();

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//FOR USER UPDATING OWN PASSWORD W/O FORGETTING IT
exports.routeTester = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!(await checkPasswordValidility(req.body.currentPassword, user.password)))
    return next(new CustomError('Passwords do not match. try again', 400));

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = Date.now();

  await user.save();

  res.status(200).json({
    status: 'success',
    data: 'vibe',
  });

  //  next();
});
