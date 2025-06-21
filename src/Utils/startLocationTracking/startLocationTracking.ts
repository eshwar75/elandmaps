import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { StoreObject } from '../../services/usage';
import { keys } from '../../services/usage/keytypes';

export const getCurrentLocation = async (
	sendLocation: (location: any) => void
) => {
	try {
		const granted = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);
		console.log(`granted location ${granted}`);
		if (granted) {
			Geolocation.getCurrentPosition(
				(position: any) => {
					const { latitude, longitude } = position.coords;
					const location = { latitude, longitude, timestamp: Date.now() };
					console.log(`granted location success ${position}`);
					StoreObject(keys.presentLocation, location);
					sendLocation(location);
				},
				error => {
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		} else {
			console.log('granted location failed');
			Geolocation.getCurrentPosition(
				(position: any) => {
					console.log(`granted location failed ${position}`);
					const { latitude, longitude } = position.coords;
					const location = { latitude, longitude, timestamp: Date.now() };
					console.log(`granted location success ${position}`);
					StoreObject(keys.presentLocation, location);
					sendLocation(location);
				},
				error => {
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
			);
		}
	} catch (error) {
		console.log('error', error);
	}
};

export const startLocationTracking = (
	sendLocation: (location: any) => void
) => {
	try {
		Geolocation.watchPosition(
			(position: any) => {
				console.log(`Location updated: ${position.coords}`);
				const { latitude, longitude } = position?.coords;
				const location = { latitude, longitude, timestamp: Date.now() };
				sendLocation(location);
			},
			error => {
				console.error(`Error watching position: ${error}`);
			},
			{
				enableHighAccuracy: true,
				distanceFilter: 0,
				interval: 5000,
				fastestInterval: 2000,
				showLocationDialog: true,
			}
		);
	} catch (error) {
		console.error(`Error starting location tracking: ${error}`);
	}
};
