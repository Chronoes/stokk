import Sequelize from 'sequelize';
import database from '../database';
import Stock from './Stock';

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

User.hasMany(Stock);

export default User;
