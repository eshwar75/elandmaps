import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';

export const requestStartUpPermission = async () => {
	try {
		if (Platform.OS === 'android') {
			const fineGranted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
			);

			if (fineGranted !== PermissionsAndroid.RESULTS.GRANTED) {
				return {
					[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]: fineGranted,
					[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION]: 'denied',
				};
			}

			let backgroundGranted = 'granted';

			if (Number(Platform.Version) >= 29) {
				backgroundGranted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
				);

				if (backgroundGranted !== PermissionsAndroid.RESULTS.GRANTED) {
					Alert.alert(
						'Background Location Required',
						'Please allow background location permission from settings to enable full functionality.',
						[
							{ text: 'Cancel', style: 'cancel' },
							{
								text: 'Open Settings',
								onPress: () => Linking.openSettings(),
							},
						]
					);
				}
			}

			return {
				[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]: fineGranted,
				[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION]:
					backgroundGranted,
			};
		}
	} catch (err) {
		console.error('Permission error:', err);
		return false;
	}
};

