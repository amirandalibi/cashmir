const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path');

router.get('/', (req, res) => {
  if (User.loggedIn(req)) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.lookupEmail(email);

    if (userData && userData.rows[0]) {
      const userObject = userData.rows[0];
      const passwordMatch = await User.verifyPassword(password, userObject.password);

      if (passwordMatch) {
        await User.saveSession(req, userObject);
        req.session['loggedIn'] = true;
        const updatedSession = User.updateSession(
          req.sessionID,
          userObject.userId,
          new Date(),
          req.headers['user-agent'],
          req.ip
        );

        if (updatedSession) {
          res.sendStatus(200);
        }
      }
    }
  } catch(error) {
    res.status(500).send(new Error(error));
  }
});

module.exports = router;
