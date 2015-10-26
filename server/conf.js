import path from 'path';

export default {
  testing: {
    database: {
      dialect: 'sqlite',
      name: 'stokk_test',
      path: './test/testDatabase.sqlite',
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
};
