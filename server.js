process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('babel-core/register');

const app = require('./app');
const database = require('./server/database');

database.sync().then(() => {
  const server = app.listen(1337, () => {
    const port = server.address().port;

    /* eslint-disable */
    console.log('Listening on ' + port);
    /* eslint-enable */
  });
});
