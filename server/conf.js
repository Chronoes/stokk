const path = require('path');

module.exports = {
  testing: {
    database: {
      dialect: 'sqlite',
      name: 'stokk',
      path: './test/testDatabase.sqlite',
      user: 'JBOY',
      loggingEnabled: false,
      password: 'JEKATERINA_JAYLORD2',
    },
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
  },
};
