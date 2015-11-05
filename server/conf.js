import path from 'path';

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
  stockList: 'https://dl.dropboxusercontent.com/s/j4hutvxzy7jc97r/out.json?dl=1',
  stockCount: 8379,
  stockQueryTimeLimit: 1000 * 3600 * 24,
};
