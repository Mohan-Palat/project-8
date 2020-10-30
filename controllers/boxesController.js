const router = require('express').Router();
const Box = require('../models/box.js');
const Category = require('../models/category.js')




// ROUTES
// INDEX
router.get('/', async (req, res) => {
    // Query DB for all boxes
    let allBoxes = await Box.find({});
    res.render('boxes/index.ejs', {
      boxes: allBoxes
    });
  })

  module.exports = router;