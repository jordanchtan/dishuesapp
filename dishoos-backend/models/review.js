const Model = require('./baseModel.js');

class Review extends Model {

  static get tableName() {
    return 'reviews';
  }

}

module.exports = Review;
