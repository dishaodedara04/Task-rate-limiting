const { RateLimiterMemory } = require('rate-limiter-flexible');

// Create rate limiters: one per second and 20 per minute
const rateLimiterPerSecond = new RateLimiterMemory({
  points: 1,
  duration: 1,
});

const rateLimiterPerMinute = new RateLimiterMemory({
  points: 20,
  duration: 60,
});

module.exports = {
  rateLimiterPerSecond,
  rateLimiterPerMinute,
};
