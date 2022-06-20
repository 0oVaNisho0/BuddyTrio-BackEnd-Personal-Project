const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('../utils/createError');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.register = async (req, res, next) => {
  try {
    const { userName, nickName, password, email } = req.body;

    if (!userName) {
      createError('username is required', 400);
    }

    if (!nickName) {
      createError('nickname is required', 400);
    }

    if (!password) {
      createError('password is required', 400);
    }

    if (!email) {
      createError('email is required', 400);
    }

    const checkUserName = await User.findOne({
      where: { userName },
    });

    if (checkUserName?.userName === userName) {
      createError('username already exists', 400);
    }

    const checkEmail = await User.findOne({
      where: { email },
    });

    if (checkEmail?.email === email) {
      createError('email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      userName,
      email,
      nickName,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: { userName },
    });

    if (!user) {
      createError('invalid credential', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError('invalid credential', 400);
    }
    const token = genToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
