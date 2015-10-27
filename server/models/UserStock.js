import Sequelize from 'sequelize';
import database from '../database';

const UserStock = database.define('user_stock', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
    validate: {
      notEmpty: true,
      isIn: ['active', 'passive'],
    },
  },
});

export default UserStock;
