import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  DAY_TRIP: 'checklist_day_trip',
  MULTI_DAY: 'checklist_multi_day',
  HOMETOWN: 'checklist_hometown',
  STAY_HOME: 'checklist_stay_home',
};

export const saveChecklist = async (type, data) => {
  try {
    const key = STORAGE_KEYS[type];
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving checklist:', error);
    return false;
  }
};

export const loadChecklist = async (type) => {
  try {
    const key = STORAGE_KEYS[type];
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading checklist:', error);
    return null;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
