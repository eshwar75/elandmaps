import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreObject = async (key: string, value: any) => {
	try {
		let convertObjectToString = '';
		if (typeof value !== 'string') {
			convertObjectToString = JSON.stringify(value);
		}
		await AsyncStorage.setItem(key, convertObjectToString);
	} catch (error) {
		console.log(`${error} error at store data ${key}`);
	}
};

export const GetStoredDetails = async (key: string) => {
	try {
		const object = await AsyncStorage.getItem(key);
		return object ? JSON.parse(object) : false;
	} catch (error) {
		console.log(`${error} error at get store data ${key}`);
	}
};
