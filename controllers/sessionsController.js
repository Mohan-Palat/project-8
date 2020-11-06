const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user.js');


// ROUTES
// NEW - form where new entries are made.
router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})

// POST (create) - no page; just an action which will add a new entry
router.post('/', (req, res) => {

  // Step 1 Look for the username
  // console.log("IN SESSIONS POST, userName:  " + req.body.userName);
  // console.log("IN SESSIONS POST, password:  " + req.body.password);
  User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('There was a problem with the database')
    } else if (!foundUser) {
      // If username not found
      res.send('<a  href="/">Username notr found</a>')
    } else {
      // Otherwise the user is found so decypt and compare the password
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        // console.log("Current user: "+ foundUser);
        req.session.currentUser = foundUser
        // redirect to box index
        res.redirect(`/users/${foundUser._id}/boxes`)
        // res.send("Logged in");
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
});

// DESTROY - no page; just an action that will destroy a session
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/sessions/new')
  });
});

module.exports = router