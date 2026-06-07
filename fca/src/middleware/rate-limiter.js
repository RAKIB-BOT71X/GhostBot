/**
 * Rate Limiter Middleware
 * Author: Rakib
 * Prevents spam and excessive requests
 */

class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }

    let timestamps = this.requests.get(key);
    timestamps = timestamps.filter(ts => now - ts < this.windowMs);
    
    if (timestamps.length >= this.maxRequests) {
      return false;
    }

    timestamps.push(now);
    this.requests.set(key, timestamps);
    return true;
  }

  getRemainingRequests(key) {
    const timestamps = this.requests.get(key) || [];
    return Math.max(0, this.maxRequests - timestamps.length);
  }

  reset(key) {
    this.requests.delete(key);
  }
}

module.exports = RateLimiter;
