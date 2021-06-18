const Card = require('../models/card');
const {
  ERROR_CODE_DEFAULT,
  ERR_CODE_VALIDATION_ERROR,
  ERR_CODE_NOT_FOUND,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(() => {
      res.status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERR_CODE_VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные в методы создания карточки',
          });
        return;
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERR_CODE_NOT_FOUND)
          .send({ message: 'Катрочка с указанным _id не найдена' });
        return;
      }
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => res.status(200).send({ card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res
        .status(ERR_CODE_NOT_FOUND)
        .send({ message: 'Переданы некорректные данные для постановки лайка' });
      return;
    }
    res
      .status(ERROR_CODE_DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => res.status(200).send({ card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res
        .status(ERR_CODE_NOT_FOUND)
        .send({ message: 'Переданы некорректные данные для снятия лайка' });
      return;
    }
    res
      .status(ERROR_CODE_DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  });
