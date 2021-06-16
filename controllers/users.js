const User = require("../models/user");
const {
  ERROR_CODE_DEFAULT,
  ERR_CODE_VALIDATION_ERROR,
  ERR_CODE_NOT_FOUND
} = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
  .then((users) => res.status(200).send({ users }))
    .catch(() =>
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.getUserOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if(!user) return res.status(ERR_CODE_NOT_FOUND).send({ message: "Пользователь с указанным _id не найден" });
      res.status(200).send(user);
    })
    .catch(err => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERR_CODE_VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  if(req.user._id !== "60c88c0993c11b2b8058db0f") {
    return res.status(ERR_CODE_NOT_FOUND).send({ message: "Пользователь не найден" });
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      console.log(err.name)
      if(err.name === 'ValidationError') return res.status(ERR_CODE_VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные в методы обновления аватара' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" });
    });
};
