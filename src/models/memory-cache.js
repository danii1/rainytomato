class MemoryCache {
  static store = {};

  static get(key) {
    return MemoryCache.store[key];
  }

  static set(key, value) {
    MemoryCache.store[key] = value;
  }
}

export default MemoryCache;
