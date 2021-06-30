const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
const {
  ERROR_CODE_DEFAULT,
} = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function start() {
  try {
    app.listen(PORT);
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Init application error: ${error}`);
  }
}

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res, next) => {
  const { statusCode = ERROR_CODE_DEFAULT, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

start();
