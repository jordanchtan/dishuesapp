const Restaurant = require('../models/restaurant.js');
const express = require('express');
const router = express.Router();
/*
* Gets all of the dishes for a given restaurant.
*/
router.get('/search', async (req, res) => {
  const query = req.query.q;
  let results = await Restaurant.query().where('name', query.toUpperCase());
  res.send({status:200, results: results})
});

module.exports = router;
