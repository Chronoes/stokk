const api = require('express').Router();

api.get('/', (req, res) => {
  res.send('I am API page. There be dragons!');
});

api.post('/login', (req, res) => {
  res.send('I am API login page.');
});

api.post('/register', (req, res) => {
  res.send('I am API register page.');
});

module.exports = api;
