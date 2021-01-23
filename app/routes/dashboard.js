var express = require('express');
var router = express.Router();
const path = require('path');
const user = require('../models/users');

router.get('/', (req, res) => {
  if (user.loggedIn(req)) {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
