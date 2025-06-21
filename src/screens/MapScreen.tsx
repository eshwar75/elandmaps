import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { requestStartUpPermission, startLocationTracking } from '../Utils';
import { GetStoredDetails } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';

type MapScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'MapScreen'
>;

interface Props {
	navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<Props> = ({ navigation }) => {
	const {
		polylines,
		markersPosition,
		currentPosition,
		isShowUserLocation,
		updatePolylines,
		updateMarkersPosition,
		updateCurrentPosition,
		updateIsShowUserLocation,
	} = useContext(LocalStoreContext);
	// const [locations, setLocations] = useState<any[]>([]);
	// const [markersPosition, setMarkersPosition] = useState<
	// 	| {
	// 			latitude: number;
	// 			longitude: number;
	// 			timestamp: number;
	// 	  }[]
	// 	| null
	// >(null);
	// const [currentPosition, setCurrentPosition] = useState<{
	// 	latitude: number;
	// 	longitude: number;
	// 	timestamp: number;
	// } | null>(null);

	useEffect(() => {
		const init = async () => {
			const hasPermission = await requestStartUpPermission();
			if (!hasPermission) {
				Alert.alert('Permission Denied', 'Location access is required.');
				return;
			}
			// Load saved route
			const savedLocations = await GetStoredDetails(keys.presentLocation);
			// setLocations(savedLocations);
			// Start tracking
			if (updateIsShowUserLocation) {
				updateIsShowUserLocation(true);
			}
			startLocationTracking((location: any) => {
				// setLocations(prev => [...prev, location]);
				if (location) {
					updatePolylines(location);
					updateMarkersPosition(location);
					updateCurrentPosition(location);
					// setLocations([...locations, location]);
					// setLocations([
					// 	{
					// 		latitude: 37.421998,
					// 		longitude: -122.084,
					// 		timestamp: Date.now(),
					// 	},
					// 	// {
					// 	// 	latitude: 37.421898,
					// 	// 	longitude: -122.124,
					// 	// 	timestamp: Date.now(),
					// 	// },
					// 	{
					// 		latitude: 37.421798,
					// 		longitude: -122.224,
					// 		timestamp: Date.now(),
					// 	},
					// ]);
					// setMarkersPosition([
					// 	{
					// 		latitude: 37.421998,
					// 		longitude: -122.084,
					// 		timestamp: Date.now(),
					// 	},
					// 	{
					// 		latitude: 37.421898,
					// 		longitude: -122.124,
					// 		timestamp: Date.now(),
					// 	},
					// 	{
					// 		latitude: 37.421798,
					// 		longitude: -122.224,
					// 		timestamp: Date.now(),
					// 	},
					// ]);
					// setCurrentPosition(location);
				} else {
					updateCurrentPosition(savedLocations);
					// setLocations(savedLocations);
				}
			});
		};
		init();
	}, []);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapContainer}
				showsUserLocation={isShowUserLocation}
				followsUserLocation={true}
				initialRegion={{
					latitude: currentPosition?.latitude ?? 37.421998,
					longitude: currentPosition?.longitude ?? -122.084,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{Array.isArray(polylines) && polylines.length > 0 && (
					<Polyline
						coordinates={polylines.map(polyline => ({
							latitude: polyline.latitude,
							longitude: polyline.longitude,
						}))}
						strokeColor="blue"
						strokeWidth={3}
					/>
				)}
				{Array.isArray(markersPosition) &&
					markersPosition.length > 0 &&
					markersPosition.map((markerPosition, index) => (
						<Marker
							key={index}
							draggable
							coordinate={markerPosition}
							title="Current Location"
						/>
					))}
			</MapView>
			<TouchableOpacity
				onPress={() => navigation.navigate('Home')}
				style={[styles.buttonContainer, { left: 10 }]}
			>
				<View style={styles.cardTextContainer}>
					<Text>Back</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate('SearchScreen')}
				style={[styles.buttonContainer, { right: 10 }]}
			>
				<View style={styles.cardTextContainer}>
					<Text>Search</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: { flex: 1 },
	mapContainer: { flex: 1 },
	cardTextContainer: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		elevation: 3,
	},
	buttonContainer: {
		position: 'absolute',
		top: 10,
		zIndex: 1,
	},
});

// console.log('Locationsaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', locations);

// latitudeDelta: 0.01,
// longitudeDelta: 0.01,
// latitude: 37.421998,
// longitude: -122.084,
// // latitudeDelta: 0.001,
// // longitudeDelta: 0.001,

{
	/* <View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 37.421998,
						longitude: -122.084,
						// latitudeDelta: 0.001,
						// longitudeDelta: 0.001,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker coordinate={{ latitude: 37.421998, longitude: -122.084 }} />
				</MapView>
			</View> */
}
{
	/* <MapView
                style={{ width: '100%', height: '100%' }}
                // showsUserLocation={true}
                // followsUserLocation={true}
                // initialRegion={{
                // 	latitude: markersPosition?.latitude || 0,
                // 	longitude: markersPosition?.longitude || 0,
                // 	latitudeDelta: 0.01,
                // 	longitudeDelta: 0.01,
                // }}
            /> */
}
