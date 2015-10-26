require('babel-core/register')({
  optional: ['es7'],
});

const defaultNodeEnv = require('./server/conf').development.NODE_ENV;

process.title = 'stokk';
process.env.NODE_ENV = process.env.NODE_ENV || defaultNodeEnv || 'dev';

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
