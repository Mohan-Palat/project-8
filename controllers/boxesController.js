const router = require('express').Router();
const Box = require('../models/box.js');  // delete this and the box model if embeded works
// const Box = require('../models/user.js');  // delete this if reference works
const Category = require('../models/category.js');
const User = require('../models/user.js');

// **************************************
const currentUser = "User1"
// **************************************

// ROUTES
// INDEX  - main menu
router.get('/', async (req, res) => {
    // Query DB for all occurrences
    let allBoxes = await Box.find({});
    console.log(allBoxes);
    res.render('boxes/index.ejs', {
        boxes: allBoxes
    });
});


// NEW - form where new entries are made.  
// If one or both async/await is omitted, you may get an error on the new page saying that the ingredients variable is not defined.
router.get('/new', async (req, res) => {
    // Get all categories from the DB
    let allCategories = await Category.find({})
    // Get the lastest box number to prevalue the new box field
    const user = await User.findOne({name: currentUser}).
        // Only return the box id (which may be many depending on num of boxes)
        populate('boxes', 'ident'). 
        exec(function (err, user) {
        // if (err) return handleError(err);
            // Assumes that the last box in the user array has the max box identNum
            let maxBoxNum = user.boxes[user.boxes.length - 1].ident;
            console.log('Here is the MAX box ident:   ' + maxBoxNum);
        // Render page and pass categories and latest box number
        res.render('boxes/new.ejs', { 
            categories: allCategories,
            maxBoxNum
        });
    });   
    
    
    
});


module.exports = router;