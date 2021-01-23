const express = require('express');
const User = require('../models/users');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userData = await User.lookupEmail(email);

    if (userData && userData.rows[0]) {
      res.status(500).send('User Exist');
    } else {
      const passwordHash = await User.generatePasswordHash(password);
      if (passwordHash) {
        const userCreated = await User.createUser(firstName, lastName, email, passwordHash);

        if (userCreated && userCreated.rows[0]) {
          res.status(200).send({user: userCreated.rows[0]});
          res.redirect('/login');
        }
      }
    }
  } catch(error) {
    res.status(500).send(error);
  }
});

module.exports = router;
