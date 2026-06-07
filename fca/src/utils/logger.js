/**
 * Logger Module
 * Author: Rakib
 * Logging utility with color support
 */

const chalk = require('chalk');

const logger = {
  info: (msg, prefix = 'INFO') => {
    console.log(chalk.blue(`[${prefix}] ${msg}`));
  },
  error: (msg, prefix = 'ERROR') => {
    console.error(chalk.red(`[${prefix}] ${msg}`));
  },
  warn: (msg, prefix = 'WARN') => {
    console.warn(chalk.yellow(`[${prefix}] ${msg}`));
  },
  debug: (msg, prefix = 'DEBUG') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.gray(`[${prefix}] ${msg}`));
    }
  },
  success: (msg, prefix = 'SUCCESS') => {
    console.log(chalk.green(`[${prefix}] ${msg}`));
  }
};

module.exports = logger;
