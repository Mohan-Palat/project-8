const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  identNum: {
    type: Number,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
  },
}, { timestamps: true });
  
  // These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
  module.exports = mongoose.model('Box', boxSchema);