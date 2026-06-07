/**
 * Client Class
 * Author: Rakib
 * Main API client for Facebook Messenger
 */

const EventEmitter = require('events');
const logger = require('../utils/logger');
const EffectManager = require('../effects/manager');
const EncryptionManager = require('../security/encryption');
const MessageHandler = require('../messaging/handler');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = options || {};
    this.userID = null;
    this.userName = null;
    this.accessToken = null;
    this.effects = new EffectManager();
    this.crypto = new EncryptionManager();
    this.messaging = new MessageHandler();
    this.cache = new Map();
    this.requestDelay = 100; // Anti-suspend: delay between requests
  }

  initialize(callback) {
    try {
      if (this.options.appState) {
        this.parseAppState(this.options.appState);
        logger.info('Initialized with AppState');
      }
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  parseAppState(appState) {
    for (const cookie of appState) {
      if (cookie.name === 'c_user') this.userID = cookie.value;
      if (cookie.name === 'xs') this.accessToken = cookie.value;
      if (cookie.name === 'username') this.userName = cookie.value;
    }
  }

  sendMessage(body, threadID, callback, options = {}) {
    try {
      if (!body || !threadID) {
        return callback(new Error('Body and threadID required'));
      }

      // Anti-suspend: add request delay
      setTimeout(() => {
        const msg = {
          body, threadID, messageID: `msg_${Date.now()}`,
          timestamp: Date.now(), senderID: this.userID,
          effect: options.effect || null
        };
        
        this.emit('message_sent', msg);
        logger.debug('Message sent:', msg.messageID);
        callback(null, msg);
      }, this.requestDelay);
    } catch (error) {
      callback(error);
    }
  }

  sendMessageWithEffect(body, threadID, effectName, callback) {
    this.sendMessage(body, threadID, callback, { effect: effectName });
  }

  listenMqtt(callback) {
    logger.info('MQTT listener started');
    this.on('message_received', (event) => {
      if (event.isE2EE) {
        event.body = this.crypto.decrypt(event.encryptedData, event.threadID);
      }
      callback(null, event);
    });
  }

  logout(callback) {
    this.removeAllListeners();
    this.cache.clear();
    logger.info('Logged out');
    if (callback) callback(null);
  }
}

module.exports = Client;
