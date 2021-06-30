const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.patch('/me', updateUser);

router.get('/me', getProfile);

router.get('/:userId', getUserById);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
