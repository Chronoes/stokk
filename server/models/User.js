import Sequelize from 'sequelize';
import database from '../database';
import Stock from './Stock';
import UserStock from './UserStock';

const User = database.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsToMany(Stock, {through: UserStock});
Stock.belongsToMany(User, {through: UserStock});

export default User;
