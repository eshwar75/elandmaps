// import React from 'react';
// import { View, Button, ViewStyle } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';
// import { startLocationTracking } from '../Utils';

// type HomeScreenNavigationProp = NativeStackNavigationProp<
// 	RootStackParamList,
// 	'Home'
// >;

// interface Props {
// 	navigation: HomeScreenNavigationProp;
// }

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
// 	return (
// 		<View style={container}>
// 			<Button
// 				title="Go to Details"
// 				onPress={() => {
// 					// navigation.navigate('Details');
// 					startLocationTracking();
// 				}}
// 			/>
// 		</View>
// 	);
// };

// export default HomeScreen;

// const container: ViewStyle = {
// 	flex: 1,
// 	alignItems: 'center',
// 	justifyContent: 'center',
// };

import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Button } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { requestStartUpPermission, startLocationTracking } from '../Utils';
import { GetStoredDetails } from '../services/usage';
import { keys } from '../services/usage/keytypes';

const LiveTrackingMapScreen = (props: any) => {
	const [locations, setLocations] = useState<any[]>([]);
	const [currentPosition, setCurrentPosition] = useState<{
		latitude: number;
		longitude: number;
		timestamp: number;
	} | null>(null);

	useEffect(() => {
		// const init = async () => {
		// 	const hasPermission = await requestStartUpPermission();
		// 	if (!hasPermission) {
		// 		Alert.alert('Permission Denied', 'Location access is required.');
		// 		return;
		// 	}
		// 	// Load saved route
		// 	const savedLocations = await GetStoredDetails(keys.presentLocation);
		// 	setLocations(savedLocations);
		// 	// Start tracking
		// 	startLocationTracking(location => {
		// 		setLocations(prev => [...prev, location]);
		// 		// setLocations([...locations, location]);
		// 		setCurrentPosition(location);
		// 	});
		// 	startLocationTracking();
		// };
		// init();
		// startLocationTracking();
	}, []);

	console.log('Locationsaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', locations);
	return (
		<View style={{ flex: 1 }}>
			<Button
				title="Go to Details"
				onPress={() => props.navigation.navigate('Details')}
			/>
			<Button
				title="Go to maps"
				onPress={() => {
					props.navigation.navigate('LiveTrackingMap');
					console.log('Go to maps button pressed');
				}}
			/>
		</View>
	);
};

export default LiveTrackingMapScreen;

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: { flex: 1 },
});
