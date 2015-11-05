require('babel-core/register')({
  optional: ['es7'],
});

/* eslint no-console: 0 */
const conf = require('./server/conf');

process.title = 'stokk';
process.env.NODE_ENV = process.env.NODE_ENV || conf.development.NODE_ENV || 'development';

const app = require('./app');
const database = require('./server/database');
const getDataFromDropbox = require('./server/util').getDataFromDropbox;

database.sync()
.then(() => database.models.stock.count())
.then(count => count !== conf.stockCount ?
   getDataFromDropbox(conf.stockList)
  .then(stocks => database.models.stock.bulkCreate(stocks))
  .catch(() => console.log('Database was not populated with empty stocks. Remove stocks table or restart server.')) :
  Promise.resolve())
.then(() => {
  const server = app.listen(1337, () => {
    const port = server.address().port;

    console.log('Listening on ' + port);
  });
});
