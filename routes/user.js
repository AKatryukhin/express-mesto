const router = require('express').Router();
const { getUsers, getUserOne, createUser } = require('../controllers/user');

router.get('/', getUsers);

router.get('/:userId', getUserOne);

router.post('/', createUser);

module.exports = router;
