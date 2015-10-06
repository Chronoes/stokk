import Sequelize from 'sequelize';
import conf from './conf';

const database = conf[process.env.NODE_ENV].database;

export default new Sequelize(database.name, database.user, database.password, {
  dialect: database.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: database.loggingEnabled,
  storage: database.path,
});
