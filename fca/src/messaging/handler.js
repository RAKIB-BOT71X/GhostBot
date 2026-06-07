/**
 * Message Handler
 * Author: Rakib
 * Handles message processing and validation
 */

const logger = require('../utils/logger');

class MessageHandler {
  constructor() {
    this.messageQueue = [];
    this.maxQueueSize = 1000;
  }

  validateMessage(msg) {
    if (!msg.body || !msg.threadID) {
      throw new Error('Invalid message: missing body or threadID');
    }
    return true;
  }

  parseMessage(text) {
    const effectMatch = text.match(/\[(\w+)\]\s*(.+)/i);
    if (effectMatch) {
      return {
        effect: effectMatch[1].toLowerCase(),
        body: effectMatch[2]
      };
    }
    return { effect: null, body: text };
  }

  queueMessage(msg) {
    if (this.messageQueue.length >= this.maxQueueSize) {
      this.messageQueue.shift();
    }
    this.messageQueue.push(msg);
    return msg;
  }

  getQueueStats() {
    return {
      queueSize: this.messageQueue.length,
      maxSize: this.maxQueueSize,
      usage: `${((this.messageQueue.length / this.maxQueueSize) * 100).toFixed(2)}%`
    };
  }
}

module.exports = new MessageHandler();
