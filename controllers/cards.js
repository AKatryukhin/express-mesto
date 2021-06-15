const Card = require('../models/card');
const ERROR_CODE_DEFAULT = 500;

  module.exports.getCards = (req, res) => {
    Card.find({})
      .then(cards => res.status(200).send({ cards }))
      .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
  };

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const ERROR_CODE = 400;

  Card.create({ name, link, owner })

  .then(card => res.status(200).send({ card }))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания карточки' });
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.doesCardExist = (req, res, next) => {
  const ERROR_CODE = 404;
  if (!cards[req.params.cardId]) {
    res.status(ERROR_CODE).send({ message: 'Карточка не найдена' });
    return;
  }
  next();
};



module.exports.removeCard= (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
      .then(card => res.status(200).send({ card }))
      .catch(err => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.doesLikeExist = (req, res, next) => {
  const ERROR_CODE = 404;
  if (likes[req.user._id]) {
    res.status(ERROR_CODE).send({ message: 'Лайк уже существует' });
    return;
  }
  next();
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true }
)
.then(card => res.status(200).send({ card }))
.catch(err => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true }
)
.then(card => res.status(200).send({ card }))
.catch(err => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
