const router = require('express').Router();
const Box = require('../models/box.js');  
const Category = require('../models/category.js');
const User = require('../models/user.js');

// **************************************
// const currentUser = "User2"
// **************************************

// ROUTES
// INDEX  - main menu 
router.get('/:userId/boxes', async (req, res) => {
    // Need the populate function along with user parm so we have all the details, not just the box identNum.
    let foundUser = await User.findById(req.params.userId).populate({
         path: 'boxes',
         options: { sort: { ['identNum']: 1 } },
    });
    res.render('boxes/index.ejs', {
        currentUser: req.session.currentUser,
        user: foundUser
    });     
});


// NEW - form where new entries are made.  
// If one or both async/await is omitted, you may get an error on the new page saying that the ingredients variable is not defined.
router.get('/:userId/boxes/new', async (req, res) => {
    // Get all categories from the DB
    const allCategories = await Category.find({});
    console.log("Categories:     " + allCategories);
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
            // console.log('Here is the MAX box identNum:   ' + maxBoxNum);
            // console.log('Here is the user id:   ' + user._id)
        // Render page and pass categories and latest box number
        res.render('boxes/new.ejs', { 
            currentUser: req.session.currentUser,
            categories: allCategories,
            user,
            maxBoxNum
        });
    });    
});
    
// SHOW
router.get('/:userId/boxes/:boxId', async (req, res) => {
    // Get the user, box, and category details from the DB
    let foundUser = await User.findById(req.params.userId);
    let foundBox = await Box.findById(req.params.boxId);
    let foundCategory = await Category.findOne({name: foundBox.category});

    res.render('boxes/show.ejs', {
        currentUser: req.session.currentUser, 
        box: foundBox,
        user: foundUser,
        category: foundCategory,
    });     
});



// POST (create) - no page; just an action which will add a new entry
// Use async/await promises
router.post('/:userId/boxes', async (req, res) => {
    // console.log("REQ BODY:     " + req.body);
    let newBox = await Box.create(req.body);
    console.log("NEW BOX:     " + newBox);
    let foundUser = await User.findByIdAndUpdate(
         req.params.userId,
        {
          $push: {
            boxes: newBox._id,
          },
        },
        { new: true, upsert: true }
      );
      console.log(foundUser);
    res.redirect(`/users/${foundUser._id}/boxes`);
});
    
// EDIT - form where entries are updated  
// If one or both async/await is omitted, you may get an error on the new page saying that the ingredients variable is not defined.
router.get('/:userId/boxes/:boxId/edit', async (req, res) => {
    // Get all categories from the DB
    const allCategories = await Category.find({})
    // Get box information in preparation for edit
    const foundBox = await Box.findById(req.params.boxId)
    const foundUser = await User.findById(req.params.userId)
    res.render('boxes/edit.ejs', {
        currentUser: req.session.currentUser,
        categories: allCategories,
        box: foundBox,
        user: foundUser
    });   
});


router.put('/:userId/boxes/:boxId', async (req, res) => {
    let foundBox = await Box.findByIdAndUpdate(
      req.params.boxId,
      req.body,
      { new: true },
    );
    // res.send('Update made');
    res.redirect(`/users/${req.params.userId}/boxes`);
});

// DELETE
router.delete('/:userId/boxes/:boxId', async (req, res) => {
    // Find user so we can remove the box id from the boes array
    let foundUser = await User.findByIdAndUpdate(
        req.params.userId,
       { $pull: { boxes: req.params.boxId,},},
       { new: true, upsert: true }
     );
    // console.log("In DELETE, found user:   " + foundUser);
    let foundBox = await Box.findByIdAndRemove(
      req.params.boxId,
    );
    // res.send('Update made');
    res.redirect(`/users/${req.params.userId}/boxes`);
});


module.exports = router;