const mongoose = require('mongoose');

const Box = require('./models/box');
const Category = require('./models/category');

const mongoURI = 'mongodb://localhost/paul-project2';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

// The next steps are doing several things, 1) creating a new instance of categories and boxes, tieing them together via Mongo reference, and then saving to the DB.  This is better than creating individual boxes/categories, saving them to the DB, then retrieving them from the db onlt to tie them together.

// Async is a "promise".  We don't want it frozen when this is processing.  This needs to be wrapped in a function.
async function seed() {
  // CREATE some boxes
  // The "await" reserve word is another promise.  We need to wait for the task to complete before moving forward
  const box1 = await Box.create({
    id: 1,
  });
  const box2 = await Box.create({
    id: 2,
  });
  const box3 = await Box.create({
    id: 3,
  });
  const box4 = await Box.create({
    id: 4,
  });

  // CREATE some unassociated categories
  const cat1 = await Category.create({
    name: 'Tools',
    boxes: [],
  });
  const cat2 = await Category.create({
    name: 'Pictures',
    boxes: [],
  });
  const cat3 = await Category.create({
    name: 'Toys',
    boxes: [],
  });
  

  // CREATE some categories and associate with boxes
  // We are not using the Mongoose create statement because we need to do additional actions before persisting (i.e., adding the boxes before saving to the DB further below).
  const c1 = new Category({
    name: 'Clothes',
    boxes: [],
  });

  const c2 = new Category({
    name: 'Cookware',
    boxes: [],
  });

  // Push some boxes into the category array
  c1.boxes.push(box2);
  c1.save(function (err, savedCategory) {
    if (err) {
      console.log(err);
    } else {
      console.log('Category is ', savedCategory);
    }
  });


  c2.boxes.push(box1);
  c2.boxes.push(box3);
  c2.save(function (err, savedCategory) {
    if (err) {
      console.log(err);
    } else {
      console.log('Category is ', savedCategory);
    }
  });
}

seed();
