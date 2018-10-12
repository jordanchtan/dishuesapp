const express = require('express');
const router = express.Router();

const fs = require('fs');
const {promisify} = require('util');

const IMAGE_DIR = '/images/';

/*
* Serve an image from the server
*/
router.get('/', async (req, res) => {
  const id = req.query.id;
  try {
    const image = await promisify(fs.readFile)(IMAGE_DIR + id, 'binary')
    res.send(image);
  } catch (e) {
    res.send({status: 500, message: 'File not found'});
  }
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
