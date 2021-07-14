const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  REG_LINK,
} = require('../utils/constants');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.get('/me', getProfile);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REG_LINK),
  }),
}), updateAvatar);

module.exports = router;
