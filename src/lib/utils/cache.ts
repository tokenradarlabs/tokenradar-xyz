interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export const setCache = <T>(key: string, value: T, ttl: number = 3600000) => {
  const now = new Date().getTime();
  const item: CacheEntry<T> = {
    value,
    expiry: now + ttl,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Failed to set item in localStorage:', error);
  }
};

export const getCache = <T>(key: string): T | null => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item: CacheEntry<T> = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.error('Failed to get item from localStorage:', error);
    return null;
  }
};

export const removeCache = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove item from localStorage:', error);
  }
};
