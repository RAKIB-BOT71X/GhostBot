/**
 * Storage Manager
 * Author: Rakib
 * Persistent storage for user data
 */

const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

class StorageManager {
  constructor(basePath = './data') {
    this.basePath = basePath;
    this.ensurePath();
  }

  ensurePath() {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
      logger.info(`Created storage path: ${this.basePath}`);
    }
  }

  save(key, data) {
    try {
      const filePath = path.join(this.basePath, `${key}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      logger.debug(`Saved: ${key}`);
      return true;
    } catch (error) {
      logger.error(`Failed to save ${key}: ${error.message}`);
      return false;
    }
  }

  load(key) {
    try {
      const filePath = path.join(this.basePath, `${key}.json`);
      if (!fs.existsSync(filePath)) return null;
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      logger.error(`Failed to load ${key}: ${error.message}`);
      return null;
    }
  }

  delete(key) {
    try {
      const filePath = path.join(this.basePath, `${key}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        logger.debug(`Deleted: ${key}`);
        return true;
      }
      return false;
    } catch (error) {
      logger.error(`Failed to delete ${key}: ${error.message}`);
      return false;
    }
  }
}

module.exports = StorageManager;
