const User = require("../models/user");
const ERROR_CODE_DEFAULT = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(() =>
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.doesUserExist = (req, res, next) => {
  const ERROR_CODE = 404;
  if (!users[req.params.userId]) {
    res.status(ERROR_CODE).send({ message: "Пользователь не найден" });
    return;
  }
  next();
};

module.exports.getUserOne = (req, res) => {
  User.findById(rec.params.userId)
    .then((users) => res.status(200).send({ users }))
    .catch(() =>
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.createUser = (req, res) => {
  const ERROR_CODE = 400;
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.updateUser = (req, res) => {
  const ERROR_CODE = 400;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.updateAvatar = (req, res) => {
  const ERROR_CODE = 400;
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
      if(err.name === 'ValidationError') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы обновления аватара' });
      res.status(ERROR_CODE_DEFAULT).send({ message: "На сервере произошла ошибка" })
    );
};
