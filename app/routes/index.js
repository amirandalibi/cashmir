var express = require('express');
var router = express.Router();
const user = require('../models/users');

router.get('/', (req, res) => {
  console.log(req)
  if (user.loggedIn(req)) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
