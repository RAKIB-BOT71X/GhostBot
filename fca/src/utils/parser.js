/**
 * Parser Utility
 * Author: Rakib
 * Utility functions for parsing data
 */

const parser = {
  parseJSON: (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  },

  parseURL: (url) => {
    try {
      return new URL(url);
    } catch (e) {
      return null;
    }
  },

  parsePhoneNumber: (number) => {
    return number.replace(/\D/g, '');
  },

  parseUserID: (id) => {
    return String(id).trim();
  }
};

module.exports = parser;
