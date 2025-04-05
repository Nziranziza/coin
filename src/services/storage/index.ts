import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (key: string, value: string) => {
    return await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    return await AsyncStorage.removeItem(key);
  },
};
