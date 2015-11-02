import Sequelize from 'sequelize';
import database from '../database';

const UserStock = database.define('user_stock', {
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  defaultScope: {
    where: {
      active: true,
    },
  },

  scopes: {
    passive: {
      where: {
        active: false,
      },
    },
  },
});

export default UserStock;
