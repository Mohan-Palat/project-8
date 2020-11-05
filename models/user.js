const mongoose = require('mongoose');
const Box = require('./box.js');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  boxes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box',
    },
  ],

}, { timestamps: true });
  
  // These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
  module.exports = mongoose.model('User', userSchema);
  