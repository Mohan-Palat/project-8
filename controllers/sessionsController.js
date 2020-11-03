const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user.js');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
  // res.render('sessions/new.ejs')
})

// on sessions form submit (log in)
router.post('/', (req, res) => {
    // console.log("REQUEST BODY:     " + req.body);

  // username is found and password matches
  // successful log in

  // username is not found - who cares about password if you don't have a username that is found?
  // unsuccessful login
  
  // username found but password doesn't match
  // unsuccessful login
  
  // some weird thing happened???????
  
  // Step 1 Look for the username
  console.log("IN SESSIONS POST, userName:  " + req.body.userName);
  console.log("IN SESSIONS POST, password:  " + req.body.password);
  User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // user is found yay!
      // now let's check if passwords match
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
})
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
module.exports = router