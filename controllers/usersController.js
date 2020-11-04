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


// NEW - form where new entries are made.  
router.get('/new', (req, res) => {
    res.render('users/new.ejs',
    {currentUser: req.session.currentUser})
})

// POST (create) - no page; just an action which will add a new entry
router.post('/', async (req, res) => {
    // Overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    
    // Create new user and then redirect user to main Box page
    let newUser = await User.create(req.body);
    // console.log('user is created', newUser);

    // Send user to Box detail page
    res.redirect(`/users/${newUser._id}/boxes`);
});


module.exports = router;