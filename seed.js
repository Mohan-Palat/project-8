const mongoose = require('mongoose');

const Box = require('./models/box.js');  // delete this and the box model if embeded works
// const Box = require('./models/user');  // delete this if reference works
// const Category = require('./models/category');
const User = require('./models/user');

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
    identNum: 1,
    desc: "This is box 1",
    category: "Tools"
  });
  const box2 = await Box.create({
    identNum: 2,
    desc: "This is box 2",
    category: "Pictures"
  });
  const box3 = await Box.create({
    identNum: 3,
    desc: "This is box 3",
    category: "Toys"
  });
  const box4 = await Box.create({
    identNum: 4,
    desc: "This is box 4",
    category: "Clothes"
  });

  // CREATE some unassociated categories
  // const cat1 = await Category.create({
  //   name: 'Tools',
  //   boxes: [],
  // });
  // const cat2 = await Category.create({
  //   name: 'Pictures',
  //   boxes: [],
  // });
  // const cat3 = await Category.create({
  //   name: 'Toys',
  //   boxes: [],
  // });
  // const cat4 = await Category.create({
  //   name: 'Clothes',
  //   boxes: [],
  // });
  // const cat5 = await Category.create({
  //   name: 'Cookware',
  //   boxes: [],
  // });
  

  // CREATE some users and associate with boxes
  // We are not using the Mongoose create statement because we need to do additional actions before persisting (i.e., adding the boxes before saving to the DB further below).
  const user1 = new User({
    name: 'User1',
    boxes: [],
  });

  // const user1 = await User.create({
  //   name: 'User1',
  //   boxes: [{
  //       identNum: 2,
  //       desc: "This is box 2",
  //       category: "Pictures"
  //     }],
  // });

  const user2 = new User({
    name: 'User2',
    boxes: [],
  });

  // Push some boxes into the user array
  user1.boxes.push(box2);
  user1.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });


  user2.boxes.push(box1);
  user2.boxes.push(box3);
  user2.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });
}

seed();
