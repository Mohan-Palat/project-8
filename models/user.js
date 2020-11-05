const mongoose = require('mongoose');
const Box = require('./box.js');

// const boxSchema = new mongoose.Schema({
//   ident: {
//     type: Number,
//   },
//   desc: {
//     type: String,
//   },
//   category: {
//     type: String,
//   },
// }, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
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
  // boxes: [boxSchema],
}, { timestamps: true });
  
  // These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
  module.exports = mongoose.model('User', userSchema);
  