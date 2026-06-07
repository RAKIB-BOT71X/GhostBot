/**
 * Anti-Suspend Module
 * Author: Rakib
 * Prevents account suspension through smart request management
 */

const logger = require('../utils/logger');

class AntiSuspend {
  constructor() {
    this.requestQueue = [];
    this.lastRequestTime = 0;
    this.minDelay = 100; // Min delay between requests (ms)
    this.maxRequests = 50; // Max requests per minute
    this.requestTimestamps = [];
  }

  async executeRequest(fn) {
    // Check rate limit
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(ts => now - ts < 60000);
    
    if (this.requestTimestamps.length >= this.maxRequests) {
      const waitTime = 60000 - (now - this.requestTimestamps[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestTimestamps = [];
    }

    // Add delay between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minDelay) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minDelay - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
    this.requestTimestamps.push(this.lastRequestTime);
    return fn();
  }

  rotateUserAgent() {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  }

  addRandomDelay(min = 100, max = 500) {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

module.exports = new AntiSuspend();
