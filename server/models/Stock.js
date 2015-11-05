import Sequelize from 'sequelize';
import database from '../database';

const Stock = database.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUppercase: true,
    },
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },

  change: {
    type: Sequelize.STRING,
    validate: {
      is: /^[+-][0-9]+\.[0-9]+/,
    },
  },

  currentPrice: {
    type: Sequelize.FLOAT,
  },

  daysLow: {
    type: Sequelize.FLOAT,
  },

  daysHigh: {
    type: Sequelize.FLOAT,
  },

  yearLow: {
    type: Sequelize.FLOAT,
  },

  yearHigh: {
    type: Sequelize.FLOAT,
  },
});

export default Stock;
