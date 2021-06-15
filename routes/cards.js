const router = require('express').Router();
const { getCards, createCard, removeCard, doesCardExist, likeCard, doesLikeExist, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', doesCardExist);
router.delete('/:cardId', removeCard);

router.put('/:cardId/likes', doesLikeExist);
router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
