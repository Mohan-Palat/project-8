const router = require('express').Router();
const Box = require('../models/box.js');  
const Category = require('../models/category.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ROUTES
// INDEX  - main menu
router.get('/', (req, res) => {
    // res.render('sessions/new.ejs')
    res.render(
      'users/index.ejs',
      {currentUser: req.session.currentUser}
    )
})


router.get('/new', (req, res) => {
    res.render('users/new.ejs',
    {currentUser: req.session.currentUser})
})
  
router.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
      console.log('user is created', createdUser)
      res.redirect(`/users/${createdUser._id}/boxes`);
    });
});


module.exports = router;