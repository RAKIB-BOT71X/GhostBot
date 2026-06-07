/**
 * Login Module
 * Author: Rakib
 * Handles Facebook authentication with AppState or credentials
 */

const Client = require('./client');
const logger = require('../utils/logger');

function login(options, callback) {
  if (!options || !callback) {
    const err = new Error('Options and callback required');
    if (callback) return callback(err);
    throw err;
  }

  try {
    const hasAppState = options.appState && Array.isArray(options.appState);
    const hasCredentials = options.email && options.password;

    if (!hasAppState && !hasCredentials) {
      return callback(new Error('AppState or email/password required'));
    }

    const client = new Client(options);
    client.initialize((err) => {
      if (err) {
        logger.error('Auth failed:', err.message);
        return callback(err);
      }
      logger.info('Authentication successful');
      callback(null, client);
    });
  } catch (error) {
    logger.error('Unexpected error:', error.message);
    callback(error);
  }
}

module.exports = login;
