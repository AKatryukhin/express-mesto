const mongoose = require('mongoose');
const {
  REG_LINK,
} = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes:
    {
      type: [{
        type: String,
        ref: 'user',
      }],
      default: [],
    },
  link: {
    type: String,
    required: true,
    validate: { validator: (v) => REG_LINK.test(v) },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
