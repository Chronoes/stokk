import path from 'path';
import moment from 'moment';

export default {
  testing: {
    database: {
      dialect: 'sqlite',
      name: 'stokk_test',
      path: path.join(__dirname, '../test/testDatabase.sqlite'),
      user: 'JBOYTEST',
      loggingEnabled: false,
      password: 'JEKATESTERINA_JAYLORD2',
    },
    NODE_ENV: 'testing',
  },
  development: {
    database: {
      dialect: 'sqlite',
      name: 'stokk',
      path: path.join(__dirname, './database.sqlite'),
      user: 'JBOY',
      loggingEnabled: false,
      password: 'JEKATERINA_JAYLORD2',
    },
    NODE_ENV: 'development',
  },
  production: {
    database: {
      dialect: 'sqlite',
      name: 'stokk',
      path: path.join(__dirname, './databaseProd.sqlite'),
      user: 'JBOY',
      loggingEnabled: false,
      password: 'JEKATERINA_JAYLORD2',
    },
    NODE_ENV: 'production',
  },
  stockList: 'https://dl.dropboxusercontent.com/s/60kxq3kacq8ydbo/newOut.json?dl=1',
  stockCount: 4723,
  stockQueryTimeLimit: moment.duration(30, 'minutes'),
  stockHistoryTimeLimit: moment.duration(30, 'days'),
};
