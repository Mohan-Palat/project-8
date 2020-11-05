const router = require('express').Router();
const Box = require('../models/box.js');  
const Category = require('../models/category.js');
const User = require('../models/user.js');

// This will be used to verify the user successully logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
}


// ROUTES
// INDEX  - main menu 
router.get('/:userId/boxes', isAuthenticated, async (req, res) => {
    // Need the populate function along with user parm so we have all the details, not just the box identNum.
    let foundUser = await User.findById(req.params.userId).populate({
         path: 'boxes',
         options: { sort: { ['identNum']: 1 } },
    });

    // Get all categories from the DB in order
    const allCategories = await Category.find({}).sort('name');
    
    // Take user to box index page
    if (foundUser.boxes.length > 0) {
        res.render('boxes/index.ejs', {
            currentUser: req.session.currentUser,
            user: foundUser
        });     
    // User has no boxes so take him/her to new box page    
    } else {
        const maxBoxNum = 0;
        // Render the page index page
        res.render('boxes/new.ejs', { 
            currentUser: req.session.currentUser,
            categories: allCategories,
            user: foundUser,
            maxBoxNum
        });   
    }
});


// NEW - form where new entries are made.  
router.get('/:userId/boxes/new', isAuthenticated, async (req, res) => {
    // Get all categories from the DB in order
    const allCategories = await Category.find({}).sort('name');
    
    // Get the lastest box number to prevalue the new box field
    const user = await User.findById(req.params.userId).
        // Only return the box identNum (which may be many depending on num of boxes)
        populate('boxes', 'identNum'). 
        exec(function (err, user) {
        // if (err) return handleError(err);
        
            // Default the max var
            let maxBoxNum = 0;
            // If boxes are found
            if (user.boxes.length > 0) {
                // Assumes that the last box in the user array has the max box identNum
                maxBoxNum = user.boxes[user.boxes.length - 1].identNum;
            }
        
        // Render page and pass categories and latest box number
        res.render('boxes/new.ejs', { 
            currentUser: req.session.currentUser,
            categories: allCategories,
            user,
            maxBoxNum
        });
    });    
});
    
// SHOW - details page.  
// It will display all boxes with some details
router.get('/:userId/boxes/:boxId', isAuthenticated, async (req, res) => {
    // Get the user, box, and category details from the DB
    let foundUser = await User.findById(req.params.userId);
    let foundBox = await Box.findById(req.params.boxId);
    let foundCategory = await Category.findOne({name: foundBox.category});
    
    // Render page
    res.render('boxes/show.ejs', {
        currentUser: req.session.currentUser, 
        box: foundBox,
        user: foundUser,
        category: foundCategory,
    });     
});



// POST (create) - no page; just an action which will add a new entry
router.post('/:userId/boxes', isAuthenticated, async (req, res) => {
    // console.log("REQ BODY:     " + req.body);

    // Create new Box
    let newBox = await Box.create(req.body);
    // console.log("NEW BOX:     " + newBox);
    
    // Find current user in DB and push new Box _id into array
    let foundUser = await User.findByIdAndUpdate(
         req.params.userId,
        {
          $push: {
            boxes: newBox._id,
          },
        },
        { new: true, upsert: true }
      );
      //   console.log(foundUser);
    
    // Display Boxes main page
    res.redirect(`/users/${foundUser._id}/boxes`);
});
    
// EDIT - form where entries are updated  
router.get('/:userId/boxes/:boxId/edit', isAuthenticated, async (req, res) => {
    // Get all categories from the DB is order
    const allCategories = await Category.find({}).sort('name');
    
    // Get User and Box information in preparation for edit
    const foundBox = await Box.findById(req.params.boxId)
    const foundUser = await User.findById(req.params.userId)
    
    // Display edit page and pass all DB info to prevalue fields
    res.render('boxes/edit.ejs', {
        currentUser: req.session.currentUser,
        categories: allCategories,
        box: foundBox,
        user: foundUser
    });   
});

// UPDATE (PUT) - no page; just an action that will update an entry
router.put('/:userId/boxes/:boxId', isAuthenticated, async (req, res) => {
    // Find in DB and update Box being edited
    let foundBox = await Box.findByIdAndUpdate(
      req.params.boxId,
      req.body,
      { new: true },
    );
    // res.send('Update made');

    // Display Boxes main page 
    res.redirect(`/users/${req.params.userId}/boxes`);
});

// DESTROY - no page; just an action that will delete an entry
router.delete('/:userId/boxes/:boxId', isAuthenticated, async (req, res) => {
    // First, find user and remove the box id from the boxes array
    let foundUser = await User.findByIdAndUpdate(
        req.params.userId,
       { $pull: { boxes: req.params.boxId,},},
       { new: true, upsert: true }
     );
    // console.log("In DELETE, found user:   " + foundUser);
    
    // Second, delete box document from box collection
    let foundBox = await Box.findByIdAndRemove(
      req.params.boxId,
    );
    
    // Display Boxes main page 
    res.redirect(`/users/${req.params.userId}/boxes`);
});


module.exports = router;