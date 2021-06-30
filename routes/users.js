const router = require('express').Router();
const {
  getUsers,
  getUserOne,
  updateUser,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserOne);

router.patch('/me', updateUser);

router.get('/me', getProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
