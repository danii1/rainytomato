class LocalStorageProvider {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    let result = null;

    try {
      result = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      result = null;
    }

    return result;
  }
}

export default LocalStorageProvider;
