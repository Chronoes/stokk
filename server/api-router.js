var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('I am API page. There be dragons!');
});

router.post('/login', function(req, res) {
  res.send('I am API login page.');
});

router.post('/register', function(req, res) {
  res.send('I am API register page.');
});

module.exports = router; 
