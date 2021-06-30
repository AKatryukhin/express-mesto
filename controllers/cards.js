const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AuthentificationError = require('../errors/authentification-err');
const ValidationError = require('../errors/validation-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методы создания карточки');
      }
    })
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner === req.user._id) {
        throw new AuthentificationError('Невозможно удалить чужую карточку');
      }
      Card.deleteOne({ _id: card._id })
        .then(() => {
          res.status(200).send({ card });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    res.status(200).send({ card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные для установки лайка');
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    res.status(200).send({ card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные для снятия лайка');
    }
  })
  .catch(next);
