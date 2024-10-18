// utils/inMemoryCache.js
const cache = {};

// Function to set data in cache
const set = (key, value, ttl) => {
  const expiration = Date.now() + ttl * 1000; // ttl in seconds
  cache[key] = { value, expiration };
};

// Function to get data from cache
const get = (key) => {
  const item = cache[key];
  if (!item) {
    return null;
  }
  if (Date.now() > item.expiration) {
    delete cache[key]; // Remove expired item
    return null;
  }
  return item.value;
};

// Function to clear expired items (optional)
const clearExpired = () => {
  const now = Date.now();
  for (const key in cache) {
    if (cache[key].expiration <= now) {
      delete cache[key];
    }
  }
};

// Optional: Clear expired items periodically
setInterval(clearExpired, 60000); // Clear every minute

module.exports = { set, get };
