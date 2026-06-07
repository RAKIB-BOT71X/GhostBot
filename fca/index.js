/**
 * Advanced FCA Library v2.0
 * Author: Rakib
 * Professional Facebook Chat API with E2EE & Message Effects
 */

const login = require('./src/core/login');
const Client = require('./src/core/client');
const effects = require('./src/effects/manager');
const crypto = require('./src/security/encryption');

module.exports = login;
module.exports.Client = Client;
module.exports.effects = effects;
module.exports.crypto = crypto;
module.exports.version = '2.0.0';

if (require.main === module) {
  console.log('[FCA] Advanced Facebook Chat API v2.0 by Rakib');
}
