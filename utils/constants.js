const REG_LINK = /https?:\/\/[\w{1,}\W{1,}]+#?\./;
const JWT_SECRET = 'de8834d65dc53455f60274601c04dc2adf7feef50ac4e32e2d44a1d109798a4a';
const MONGO_URL = 'mongodb://localhost:27017/mestodb';
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

const allowedCors = [
  'https://mesto.front.nomoredomains.monster',
  'http://mesto.front.nomoredomains.monster',
];
module.exports = {
  REG_LINK,
  JWT_SECRET,
  MONGO_URL,
  allowedCors,
  ALLOWED_METHODS,
};
