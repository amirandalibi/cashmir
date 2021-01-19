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
    INSERT INTO users(user_firstname, user_lastname, user_email, user_password, user_role)
    VALUES($1, $2, $3, $4, $5)
    RETURNING user_firstname, user_lastname, user_email
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
        SET user_id = $1,
       	user_data = $3
       WHERE (sid = $2);
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
    WHERE user_email = $1
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
 * Save current session into database
 * @param {object} request
 * @param {object} user
 * @returns {Promise}
 */
function saveSession(request, user) {
  return request.session.save((err) => {
    if (!err) {
       return updateSession(
        request.sessionID,
        user.user_id,
        new Date(),
        request.headers['user-agent'],
        request.ip
      )
    }
  })
}

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
