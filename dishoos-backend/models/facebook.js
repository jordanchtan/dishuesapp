const Model = require('./baseModel.js');

class Facebook extends Model {

  static get tableName() {
    return 'facebook';
  }
}

module.exports = Facebook;
