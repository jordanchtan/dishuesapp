const Model = require('./baseModel.js');

class Restaurant extends Model {

  static get tableName() {
    return 'restaurant';
  }
}

module.exports = Restaurant;
