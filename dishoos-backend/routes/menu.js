const Dish = require('../models/dish.js');
const express = require('express');
const router = express.Router();
/*
* Gets all of the dishes for a given restaurant.
*/
router.get('/all', async (req, res) => {
  var id = req.query.restaurantId;
  var type = req.query.type.toUpperCase();
  let menu;
  if (type === 'ALL') {
    menu = await Dish.query().where('restaurantId', id);
  } else {
    menu = await Dish.query().where('restaurantId', id).andWhere('type', type);
  }
  menu.map((dish) => {delete dish['restaurantId']});
  res.send({status:200, menu: menu})

});

module.exports = router;
