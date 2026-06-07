/**
 * Error Handler Middleware
 * Author: Rakib
 * Centralized error handling
 */

const logger = require('../utils/logger');

const errorHandler = {
  handle: (error, context = '') => {
    logger.error(`${context}: ${error.message}`);
    return {
      success: false,
      error: error.message,
      timestamp: Date.now()
    };
  },

  handleAsync: async (fn) => {
    try {
      return await fn();
    } catch (error) {
      return errorHandler.handle(error);
    }
  }
};

module.exports = errorHandler;
