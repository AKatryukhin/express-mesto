const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
const {
  ERR_CODE_NOT_FOUND,
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

// app.listen(PORT);
// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: '60c88c0993c11b2b8058db0f',
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(ERR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

start();
