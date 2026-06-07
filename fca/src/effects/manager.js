/**
 * Effect Manager
 * Author: Rakib
 * Manages message effects and animations
 */

const logger = require('../utils/logger');

class EffectManager {
  constructor() {
    this.effects = {
      fire: { emoji: '🔥', code: 'FIRE', animation: 'burst', color: '#FF6B35' },
      love: { emoji: '❤️', code: 'LOVE', animation: 'heartbeat', color: '#FF1744' },
      celebration: { emoji: '🎉', code: 'CELEBRATION', animation: 'confetti', color: '#FFD700' },
      boom: { emoji: '💥', code: 'BOOM', animation: 'explosion', color: '#FF6B35' },
      sparkle: { emoji: '✨', code: 'SPARKLE', animation: 'sparkle', color: '#FFD700' },
      ghost: { emoji: '👻', code: 'GHOST', animation: 'float', color: '#FFFFFF' },
      skull: { emoji: '💀', code: 'SKULL', animation: 'spin', color: '#000000' },
      tada: { emoji: '🎊', code: 'TADA', animation: 'pop', color: '#9C27B0' },
      wow: { emoji: '😮', code: 'WOW', animation: 'shake', color: '#FF69B4' },
      angel: { emoji: '😇', code: 'ANGEL', animation: 'float', color: '#FFD700' }
    };
  }

  getEffect(name) {
    return this.effects[name?.toLowerCase()] || null;
  }

  listEffects() {
    return Object.keys(this.effects);
  }

  createMessageWithEffect(body, effectName) {
    const effect = this.getEffect(effectName);
    if (!effect) {
      return { error: `Effect '${effectName}' not found` };
    }
    return {
      body,
      effect: { id: effectName, code: effect.code, emoji: effect.emoji },
      timestamp: Date.now()
    };
  }
}

module.exports = new EffectManager();
