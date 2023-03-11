const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const Email = require('./../utils/email');
const util = require('util');

const tokenGenerator = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, res, signin = false) => {
  const token = tokenGenerator(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  res.locals.user = user;

  res.status(statusCode).json({
    status: signin
      ? 'Register is complete! Please confirm your email to start'
      : 'success',
    token,
    data: { user },
  });
};

exports.signIn = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = tokenGenerator(user._id);
  // const url = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/users/verify?token=${token}`;
  const url = `http://localhost:3000/verified?token=${token}`;

  await new Email(user, url).sendVerified();

  sendToken(user, 200, res, true);
});

exports.verified = catchAsync(async (req, res, next) => {
  const token = req.query.token;

  if (!token) return next(new AppError(401, 'sorry please signup first'));

  //2 verification of the token

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  //3 verify user
  const user = await User.findById(decoded.id);

  if (!user)
    return next(new AppError(401, 'user do not exist please signup first'));

  user.verified = true;
  user.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success', verified: 'true' });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError(400, 'please provide email and password'));

  //2 check if user exists verified and password is correct

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, 'Incorrect email or password'));
  }
  sendToken(user, 200, res);
});

exports.getVerify = catchAsync(async (req, res, next) => {
  if (!req.cookie.jwt) next(new AppError(401, 'please login first'));

  const decoded = await util.promisify(jwt.verify)(
    req.cookie.jwt,
    process.env.JWT_SECRET
  );

  //3 verify user
  const user = await User.findById(decoded.id);

  if (!user)
    return next(new AppError(401, 'user do not exist please login first'));

  const url = `http://localhost:3000/verified?token=${req.cookie.jwt}`;

  await new Email(user, url).sendVerified();

  sendToken(user, 200, res);
});
