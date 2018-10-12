const Model = require('./baseModel.js');

class Dish extends Model {

  static get tableName() {
    return 'dish';
  }

}

module.exports = Dish;
