const router = require('express').Router();
const { getUsers, doesUserExist, getUserOne, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', doesUserExist);
router.get('/:userId', getUserOne);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
