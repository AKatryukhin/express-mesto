const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: ObjectID,
    required: true,
  },
  likes: [{
    default: []
  }],
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
