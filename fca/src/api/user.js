/**
 * User API
 * Author: Rakib
 * User-related operations
 */

const logger = require('../utils/logger');

class UserAPI {
  constructor(client) {
    this.client = client;
  }

  getUserInfo(userID, callback) {
    try {
      const info = {
        id: userID,
        name: `User_${userID}`,
        isFriend: false,
        lastActive: null,
        profilePic: null
      };
      callback(null, info);
    } catch (error) {
      callback(error);
    }
  }

  getMultipleUserInfo(userIDs, callback) {
    try {
      const users = userIDs.map(id => ({
        id,
        name: `User_${id}`,
        isFriend: false
      }));
      callback(null, users);
    } catch (error) {
      callback(error);
    }
  }

  getUserStatus(userID, callback) {
    try {
      callback(null, { userID, isOnline: false, lastSeen: null });
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = UserAPI;
