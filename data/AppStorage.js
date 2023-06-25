import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = (data) => {
    try {
        AsyncStorage.setItem('APPDATA', JSON.stringify(data));
        return "Data has been stored!";
    } catch (e) {
        throw e;
    }
};

export const getData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('APPDATA').then(value => {
            if (value !== null) {
                resolve(value);
            } else {
                reject(Error("Something went wrong!"));
            }
        })
    });
};