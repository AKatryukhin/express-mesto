const jwt = require('jsonwebtoken');
const { AuthentificationError } = require('../errors/not-found-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'very-strong-secret');
  } catch (err) {
    next(new AuthentificationError('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};
