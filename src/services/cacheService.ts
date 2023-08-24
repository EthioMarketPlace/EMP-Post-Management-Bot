import NodeCache from "node-cache";
const cache = new NodeCache();

class Cache {
  static getValue(key: string) {
    return cache.get(key);
  }

  static saveCache(
    key: string,
    value: string | number | object,
    ttl: number | string
  ) {
    return cache.set(key, value, ttl);
  }
}

export default Cache;
