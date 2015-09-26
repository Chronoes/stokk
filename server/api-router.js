const api = require('express').Router();
const handle = require('./api-handlers');

api.post('/login', handle.login);
api.post('/register', handle.register);

module.exports = api;
