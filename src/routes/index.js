var express = require('express');
var router = express.Router();
var Business = require('../models/business');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.send('hello world');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});
router.get('/about', function(req, res) {
  res.render('about');
});

module.exports = router;
