import AsyncStorage from '@react-native-async-storage/async-storage';

// Stocker une valeur
export const storeData = async (key, value) => {
    try {
        console.log(value)
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

// Récupérer une valeur
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};

// Supprimer une valeur
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};
