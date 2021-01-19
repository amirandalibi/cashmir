'use strict';

const { sessionSecret } = require('./config');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const dbPool = require('./database');
const APP_PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// set static files folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new pgSession({
    pool: dbPool,
    tableName: 'user_sessions'
  }),
  name: 'cashmir_logged',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1 * 1 * 60 * 60 * 1000 } // 1 day
}));

// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter)
app.use('/register', registerRouter);

app.listen(APP_PORT, function () {
  console.log('👛 server listening on port ' + APP_PORT);
});
