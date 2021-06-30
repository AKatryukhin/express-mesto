const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_CODE_DEFAULT,
  ERR_CODE_VALIDATION_ERROR,
  ERR_CODE_NOT_FOUND,
  ERR_CODE_AUTH_ERROR,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'very-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt',
          token,
          {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(() => res
      .status(ERROR_CODE_DEFAULT)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERR_CODE_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getProfile = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      ...user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_VALIDATION_ERROR).send({
          message:
            'Переданы некорректные данные в методы создания пользователя',
        });
        return;
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERR_CODE_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_VALIDATION_ERROR).send({
          message: 'Переданы некорректные данные в методы обновления профиля',
        });
        return;
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERR_CODE_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(ERR_CODE_VALIDATION_ERROR).send({
          message: 'Переданы некорректные данные в методы обновления аватара',
        });
        return;
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
