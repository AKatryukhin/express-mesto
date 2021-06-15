const Card = require('../models/card');

  module.exports.getCards = (req, res) => {
    Card.find({})
      .then(cards => res.send({ cards }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  };

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link })

  .then(card => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.removeCard= (req, res) => {
  Card.findByIdAndRemove(req.params.id)
      .then(card => res.send({ card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
