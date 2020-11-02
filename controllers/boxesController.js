const router = require('express').Router();
const Box = require('../models/box.js');  
const Category = require('../models/category.js');
const User = require('../models/user.js');

// **************************************
// const currentUser = "User2"
// **************************************

// ROUTES
// INDEX  - main menu
router.get('/', async (req, res) => {
    // Need the populate function along with user parm so we have all the details, not just the box identNum.
    let foundUser = await User.findOne({name: currentUser}).populate({
    // let foundUser = await User.findById(req.params.id).populate({
        path: 'boxes',
        options: { sort: { ['identNum']: 1 } },
    });
    console.log(foundUser);
    console.log("box stuff:    " + foundUser.boxes[0].desc);
    res.render('boxes/index.ejs', {
        user: foundUser
    });     
});





// // NEW - form where new entries are made.  
// // If one or both async/await is omitted, you may get an error on the new page saying that the ingredients variable is not defined.
// router.get('/:userId/boxes/new', async (req, res) => {
//     // Get all categories from the DB
//     let allCategories = await Category.find({})
//     // Get the lastest box number to prevalue the new box field
//     const user = await User.findById(req.params.userId).
//         // Only return the box identNum (which may be many depending on num of boxes)
//         populate('boxes', 'identNum'). 
//         exec(function (err, user) {
//         // if (err) return handleError(err);
//             // Assumes that the last box in the user array has the max box identNum
//             let maxBoxNum = user.boxes[user.boxes.length - 1].identNum;
//             console.log('Here is the MAX box identNum:   ' + maxBoxNum);
//             console.log('Here is the user id:   ' + user._id)
//         // Render page and pass categories and latest box number
//         res.render('boxes/new.ejs', { 
//             categories: allCategories,
//             user: user,
//             maxBoxNum
//         });
//     });    
// });
    
// POST (create) - no page; just an action which will add a new entry
// Use async/await promises
// router.post('/', async (req, res) => {
//     console.log(req.body);
//     let box = await Box.create(req.body);
//     // let foundUser = await User.findByIdAndUpdate(
//     //     req.params.foodId,
//     //     {
//     //       $push: {
//     //         ingredients: req.body.ingredients,
//     //       },
//     //     },
//     //     { new: true, upsert: true }
//     //   );
//     //   console.log(foundFood);
//     // let user = await User.create(req.body);
//     res.redirect('/users/:userId/boxes');
// });
    



module.exports = router;