class MemoryCache {
  static store = {};

  static get(key) {
    let result = MemoryCache.store[key];
    console.log('cache get called', key, result);
    return result;
  }

  static set(key, value) {
    MemoryCache.store[key] = value;
    console.log('cache set called', key);
    console.log('cache contents', MemoryCache.store);
  }
}

export default MemoryCache;
