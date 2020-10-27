import AsyncStorage from '@react-native-community/async-storage';


async function makeProxy() {
  const keys = await AsyncStorage.getAllKeys();
  const pairs = await Promise.all(keys.map(
    key => AsyncStorage.getItem(key).then(value => [key, value])
  ));
  // const inMemoryStorage = Object.fromEntries(pairs); - not implemented in rn
  const inMemoryStorage = {};
  for(let pair of pairs) {
    const [key, value] = pair;
    inMemoryStorage[key] = value;
  }
  function setItem(key, value) {
    inMemoryStorage[key] = value;
    AsyncStorage.setItem(key, value);
  }
  function set(target, key, value) {
    setItem(key, value);
  }
  function clear() {
    for (let key in inMemoryStorage) {
      delete inMemoryStorage[key];
    }
    return AsyncStorage.clear();
  }
  function removeItem(key) {
    delete inMemoryStorage[key];
    AsyncStorage.removeItem(key);
  }
  function get(target, key) {
    if (prototype[key]) {
      return prototype[key];
    }
    return getItem(key);
  }
  function getItem(key) {
    debugger;
    return inMemoryStorage[key];
  }
  const prototype = {
    getItem,
    setItem,
    clear,
    removeItem
  };

  const proxy = new Proxy(inMemoryStorage, {get,set});
  global.localStorage = proxy;
  return proxy;
}

export default makeProxy();
