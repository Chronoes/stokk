import Sequelize from 'sequelize';
import database from '../database';

const StockHistory = database.define('stock_history', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  open: {
    type: Sequelize.FLOAT,
  },

  close: {
    type: Sequelize.FLOAT,
  },

  high: {
    type: Sequelize.FLOAT,
  },

  low: {
    type: Sequelize.FLOAT,
  },
}, {
  timestamps: false,
});

export default StockHistory;
