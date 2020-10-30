const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true
  },
  boxes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box',
    },
  ],
}, { timestamps: true });
  
  // These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
  module.exports = mongoose.model('Category', categorySchema);