import Geolocation from 'react-native-geolocation-service';
// import BackgroundGeolocation from 'react-native-background-geolocation';
// import StorageService from './StorageService';

export const startLocationTracking = (onLocationUpdate: any) => {
	Geolocation.watchPosition(
		position => {
			const { latitude, longitude } = position.coords;
			const location = { latitude, longitude, timestamp: Date.now() };
			// StorageService.saveLocation(location);
			onLocationUpdate(location);
		},
		error => console.log(error),
		{ enableHighAccuracy: true, distanceFilter: 10 }
	);

	// BackgroundGeolocation.on('location', (location: any) => {
	// 	const { latitude, longitude } = location.coords;
	// 	const newLocation = { latitude, longitude, timestamp: Date.now() };
	// 	// StorageService.saveLocation(newLocation);
	// 	onLocationUpdate(newLocation);
	// });

	// BackgroundGeolocation.configure({
	// 	desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
	// 	distanceFilter: 10,
	// });

	// BackgroundGeolocation.start();
};
