const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Meal = require('./mealModel');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [40, 'Name must not have more than 40 characters'],
    minlength: [3, 'Name must not have less than 3 characters'],
    required: [true, 'Please give us your name'],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Please Provide a password'],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match, please try again...',
    },
    required: [true, 'Please confirm your password'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Provide valid email'],
    required: [true, 'Please give us your email'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'manager'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  passwordChangedAt: {
    type: Date,
  },
  favourites: [
    {
      type: mongoose.ObjectId,
      ref: 'Meal',
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpiresIn: Date,
});

/**
 * Pre "save" hook encrypting the password right before saving to the DB
 */

userSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.didPasswordChange = function (JWTIssueTime) {
  //console.log(this);
  //console.log(JWTIssueTime);
  if (this.passwordChangedAt) {
    let changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log({ JWTIssueTime }, { changedTimeStamp });
    return JWTIssueTime < changedTimeStamp;
  }
  return false;
};

userSchema.methods.setResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(12).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //Setting the Time valid for a reset of the password(10 minutes)
  this.resetPasswordExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
