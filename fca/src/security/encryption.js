/**
 * Encryption Manager
 * Author: Rakib
 * E2EE encryption/decryption for messages
 */

const crypto = require('crypto');
const logger = require('../utils/logger');

class EncryptionManager {
  constructor() {
    this.keyCache = new Map();
    this.algorithm = 'aes-256-gcm';
  }

  encrypt(plaintext, key) {
    try {
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);
      let encrypted = cipher.update(plaintext, 'utf8', 'binary');
      encrypted += cipher.final('binary');
      const tag = cipher.getAuthTag();
      return Buffer.concat([iv, Buffer.from(encrypted, 'binary'), tag]).toString('base64');
    } catch (error) {
      logger.error('Encryption error:', error.message);
      return null;
    }
  }

  decrypt(encryptedData, key) {
    try {
      const buffer = Buffer.from(encryptedData, 'base64');
      const iv = buffer.slice(0, 12);
      const tag = buffer.slice(buffer.length - 16);
      const ciphertext = buffer.slice(12, buffer.length - 16);
      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
      decipher.setAuthTag(tag);
      let decrypted = decipher.update(ciphertext, 'binary', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      logger.error('Decryption error:', error.message);
      return null;
    }
  }
}

module.exports = new EncryptionManager();
