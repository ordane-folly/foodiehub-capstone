import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  USERS: "@capstone_users",
  SESSION: "@capstone_session",
  FAVORITES: "@capstone_favorites",
  SETTINGS: "@capstone_settings"
};

async function readJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  async getUsers() {
    return readJSON(KEYS.USERS, []);
  },
  async saveUsers(users) {
    return writeJSON(KEYS.USERS, users);
  },
  async getSession() {
    return readJSON(KEYS.SESSION, null);
  },
  async saveSession(user) {
    return writeJSON(KEYS.SESSION, user);
  },
  async clearSession() {
    return AsyncStorage.removeItem(KEYS.SESSION);
  },
  async getFavorites() {
    return readJSON(KEYS.FAVORITES, []);
  },
  async saveFavorites(favorites) {
    return writeJSON(KEYS.FAVORITES, favorites);
  },
  async getSettings() {
    return readJSON(KEYS.SETTINGS, { notifications: true });
  },
  async saveSettings(settings) {
    return writeJSON(KEYS.SETTINGS, settings);
  },
  async debugDump() {
    const [users, session, favorites, settings] = await Promise.all([
      readJSON(KEYS.USERS, []),
      readJSON(KEYS.SESSION, null),
      readJSON(KEYS.FAVORITES, []),
      readJSON(KEYS.SETTINGS, { notifications: true })
    ]);
    return { users, session, favorites, settings };
  }
};
