process.env.NODE_ENV = 'test';

var chai     = require('chai');
var should   = chai.should();
var chaiHttp = require('chai-http');
var server   = require('../index.js');
const knex   = require('../models/knex.js');

chai.use(chaiHttp);


const MENU_ITEMS = [{
  name: 'chicken thighs',
  description: 'Really nice chicken thighs.',
  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/09/a2/9f/50/nando-s.jpg',
  price: '10.25',
  type: 'MAIN',
  tags: '',
},
{
  name: 'sunset burger',
  description: 'A super nice burger with some real good sauce.',
  imageUrl: 'https://metrouk2.files.wordpress.com/2016/10/sunset-burger.jpg?w=748&h=550&crop=1',
  price: '11.00',
  type: 'MAIN',
  tags: '',
},
{
  name: 'chicken breast',
  description: 'Some chicken breast which is very tasty.',
  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/05/5c/b1/d0/nando-s.jpg',
  price: '10.50',
  type: 'MAIN',
  tags: '',
},
{
  name: 'Sweet potato wrap',
  description: 'sweet potato and butternut wrap.',
  imageUrl: 'http://www.veganfoodandliving.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-17-at-09.29.48-1024x571.png',
  price: '6.45',
  type: 'MAIN',
  tags: 'Vegetarian',
},
{
  name: 'chocolot cake',
  description: 'great chocolate cake',
  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/06/a0/31/d0/nando-s.jpg',
  price: '6.50',
  type: 'DESSERT',
  tags: 'Vegetarian',
},
{
  name: 'frozen yoghurt',
  description: 'unlimited frozen yoghurt',
  imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/44/8f/48/nando-s.jpg',
  price: '6.50',
  type: 'DESSERT',
  tags: 'Vegetarian',
},
];

const NANDOS_SEARCH_RESULTS = [{
  id:0,
  name: 'NANDOS',
}];

const D_START = 4;
const D_END = 5;
//-----------Menu items route ------------/////
  describe('menu items route', function(done) {
        // create database before each test.
    beforeEach(function(done) {
       knex.migrate.rollback()
       .then(function() {
         knex.migrate.latest()
         .then(function() {
           return knex.seed.run()
           .then(function() {
             done();
           });
         });
       });
     });
    // destroy database after each test.
     afterEach(function(done) {
       knex.migrate.rollback()
       .then(function() {
         done();
       });
     });
    describe('get all', function(done) {
      it('should successfully return all the dishes for the given restaurant', function(done) {
        chai.request(server)
          .get('/menu/all?restaurantId=0&type=all')
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('menu');
            res.body.menu.should.be.a('array');
            res.body.menu.map((dish) => {delete dish['id']});
            res.body.menu.should.deep.equal(MENU_ITEMS);
            done();
           });
       });
       it('should only return dishes of the requested type', function(done) {
         chai.request(server)
           .get('/menu/all?restaurantId=0&type=DESSERT')
           .end(function(err, res) {
             res.should.have.status(200);
             res.body.should.have.property('menu');
             res.body.menu.should.be.a('array');
             res.body.menu.map((dish) => {delete dish['id']});
             res.body.menu.should.deep.equal(MENU_ITEMS.slice(D_START, D_END + 1));
            });
        chai.request(server)
          .get('/menu/all?restaurantId=0&type=MAIN')
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.property('menu');
            res.body.menu.should.be.a('array');
            res.body.menu.map((dish) => {delete dish['id']});
            res.body.menu.should.deep.equal(MENU_ITEMS.slice(0, D_START));
            done();
           });
        });
   });
});

describe('restaurants route', function(done) {
      // create database before each test.
  beforeEach(function(done) {
     knex.migrate.rollback()
     .then(function() {
       knex.migrate.latest()
       .then(function() {
         return knex.seed.run()
         .then(function() {
           done();
         });
       });
     });
   });
  // destroy database after each test.
   afterEach(function(done) {
     knex.migrate.rollback()
     .then(function() {
       done();
     });
   });
  describe('search', function(done) {
    it('should successfully return the matching search query', function(done) {
      chai.request(server)
        .get('/restaurant/search?q=NANDOS')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          res.body.results.should.deep.equal(NANDOS_SEARCH_RESULTS);
          done();
         });
     });
 });
});
