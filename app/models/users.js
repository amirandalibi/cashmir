'use strict';

const db = require('../database');
const bcrypt = require('bcryptjs');

/**
 * Create the user in database
 * @since 1.0.0
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
function createUser(first, last, email, password) {
  const query = {
    text:`
    INSERT INTO users("firstName", "lastName", "email", "password", "role")
    VALUES($1, $2, $3, $4, $5)
    RETURNING "firstName", "lastName", "email"
    `,
    values: [first, last, email, password, 'user'],
  };

  return db.query(query);
}

/**
 * Update current session with user info
 * @since 1.0.0
 * @param {string} sessionId
 * @param {string} userId
 * @param {object} lastActivity
 * @param {string} userAgent
 * @param {string} ipAddress
 * @returns {Promise}
 */
function updateSession(sessionId, userId, lastActivity, userAgent, ipAddress) {
  const userData = JSON.stringify({
    user_agent: userAgent,
    last_activity: lastActivity,
    ip_address: ipAddress
  });
  const query = {
    text:`
       UPDATE "user_sessions"
        SET "userId" = $1,
       	"userData" = $3
       WHERE (sid = $2)
       RETURNING "userId";
    `,
    values: [userId, sessionId, userData],
  };
  return db.query(query);
}

/**
 * Lookup user in database
 * @since 1.0.0
 * @param {string} email
 * @returns {Promise}
 */
function lookupEmail(email) {
  const query = {
    text: `
    SELECT * FROM users
    WHERE "email" = $1
    `,
    values: [email],
  }
  return db.query(query);
}

/**
 * Generates password hash using bcrypt
 * @since 1.0.0
 * @param {string} password
 * @returns {Promise}
 */
function generatePasswordHash(password) {
  const saltRounds = 12; // more than this is very cpu intensive
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

/**
 * Verify plain password with hashed version
 * @since 1.0.0
 * @param {string} plainPassword
 * @param {string} passwordHash
 */
function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

/**
 * Saves current session into database
 * @param {object} request
 */
function saveSession(request) {
  return request.session.save((err) => {
    if (err) console.log(err);
  })
}

/**
 * Checks to see if current session is logged in
 * @param {object} request
 * @returns {boolean}
 */
function loggedIn(request) {
  return request.session && request.session.loggedIn;
}

module.exports = {
  createUser,
  generatePasswordHash,
  lookupEmail,
  verifyPassword,
  updateSession,
  loggedIn,
  saveSession
}
