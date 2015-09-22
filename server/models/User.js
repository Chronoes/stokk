var Sequelize = require('sequelize');
var sequelize = require('../database');

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
