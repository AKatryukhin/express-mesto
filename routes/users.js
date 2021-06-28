const router = require('express').Router();
const {
  getUsers,
  getUserOne,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserOne);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
