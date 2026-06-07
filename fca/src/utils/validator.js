/**
 * Validator Utility
 * Author: Rakib
 * Validation functions for data integrity
 */

const validator = {
  isValidUserID: (id) => {
    return /^\d+$/.test(String(id));
  },

  isValidThreadID: (id) => {
    return /^\d+$/.test(String(id));
  },

  isValidMessage: (msg) => {
    return msg && typeof msg === 'string' && msg.trim().length > 0;
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidAppState: (appState) => {
    return Array.isArray(appState) && appState.length > 0;
  }
};

module.exports = validator;
