const User = require('../models/user');
const {
  ERROR_CODE_DEFAULT,
  ERR_CODE_VALIDATION_ERROR,
  ERR_CODE_NOT_FOUND,
} = require('../utils/constants');

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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
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
