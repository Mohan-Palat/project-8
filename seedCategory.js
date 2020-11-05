const router = require('express').Router();
const mongoose = require('mongoose'); 
const Category = require('./models/category');

router.get('/categories', async (req, res) => {
  
  // CREATE some unassociated categories
  const cat1 = await Category.create({
    name: 'Tools',
    imageFile: 'tools.jpg',
  });
  const cat2 = await Category.create({
    name: 'Pictures',
    imageFile: 'pexels-suzy-hazelwood-Photographs.jpg'
  });
  const cat3 = await Category.create({
    name: 'Toys',
    imageFile: 'pexels-mike-toys.jpg'
  });
  const cat4 = await Category.create({
    name: 'Clothes',
    imageFile: 'clothes2.jpg'
  });
  const cat5 = await Category.create({
    name: 'Cookware',
    imageFile: 'potsAndPans.jpg',
  });

  res.send("Category collection seeded");
});

module.exports = router;