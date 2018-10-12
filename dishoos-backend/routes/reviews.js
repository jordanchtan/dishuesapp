const Review = require('../models/review.js');
const Facebook = require('../models/facebook.js');
const express = require('express');
const router = express.Router();

const fs = require('fs');
const {promisify} = require('util');

const IMAGE_DIR = '/images/';
/*
* Add a user review to the database.
*/
router.post('/', async (req, res) => {
  const items = req.body;
  var image = "";
  try {
    image  = Buffer.from(items.image, 'base64');
  } catch (e) {
    console.log(e);
  }
  delete items['image'];
  const review = await Review.query().insert(items);
  const id = review.id;
  // write image to images/id folder
  try {
    await promisify(fs.writeFile)('/home/server' + IMAGE_DIR + id + '.jpg', image, 'binary');
    await Review.query().where('id', id).patch({imageurl: IMAGE_DIR + id + '.jpg'});
    res.send({status:200});
  } catch (e) {
    console.log(e);
    res.send({status: 500})
  }
});

router.post('/addDetails', async (req, res) => {
  const items = req.body;
  const details = await Facebook.query().insert(items);
  res.send({status:200});
});

router.get('/getReviews', async (req, res) => {
  var id = req.query.dishid;
  let reviews;
  reviews = await Review.query().where('dishid', id);
  reviews.map((review) => {delete review['dishid']});
  res.send({status:200, reviews: reviews});
});

router.get('/rating', async (req, res) => {
  var id = req.query.id;
  const resp = await Review.query().where('dishid', id).avg('reviews.rating');
  let avg = resp[0].avg;
  console.log('dish with id ' + id + 'has rating ' + avg)
  res.send({status: 200, rating: avg})
});

router.get('/friend', async (req, res) => {
  var id = req.query.userid;
  var dish = req.query.dishid;
  const resp = await Review.query().where('username', id).andWhere('dishid', dish);
  res.send({status: 200, res: resp});
});

module.exports = router;

//
// const readdir = promisify(fs.readdir);
//
// async function myF() {
//   let names;
//   try {
//     {err, names} = await readdir('path/to/dir');
//     if (err) {
//         // Handle the error.
//     }
//   } catch (e) {
//     console.log('e', e);
//   }
//   if (names === undefined) {
//     console.log('undefined');
//   } else {
//     console.log('First Name', names[0]);
//   }
// }
//
// myF();
