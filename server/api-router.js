const api = require('express').Router();
const loginHandler = require('./routes/login');
const registerHandler = require('./routes/register');

api.post('/login', loginHandler);
api.post('/register', registerHandler);

module.exports = api;
