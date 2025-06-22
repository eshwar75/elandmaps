import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { requestStartUpPermission, startLocationTracking } from '../Utils';
import { GetStoredDetails } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import { useNavigation } from '@react-navigation/native';
import { getDrivingRouteCoordinates } from '../services/api/locations';

type MapScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'MapScreen'
>;

interface Props {
	navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<Props> = props => {
	const {
		polylines,
		markersPosition,
		currentPosition,
		isShowUserLocation,
		updatePolylines,
		updateMarkersPosition,
		updateCurrentPosition,
		updateIsShowUserLocation,
	} = useContext(LocalStoreContext) as {
		polylines: any;
		markersPosition: any[];
		currentPosition: any;
		isShowUserLocation: boolean;
		updatePolylines: (location: any) => void;
		updateMarkersPosition: (location: any) => void;
		updateCurrentPosition: (location: any) => void;
		updateIsShowUserLocation: (show: boolean) => void;
	};
	const mapRef = useRef<MapView | null>(null);
	const navigation = useNavigation();

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

	// useEffect(() => {
	// 	const init = async () => {
	// 		const hasPermission = await requestStartUpPermission();
	// 		if (!hasPermission) {
	// 			Alert.alert('Permission Denied', 'Location access is required.');
	// 			return;
	// 		}
	// 		// Load saved route
	// 		const savedLocations = await GetStoredDetails(keys.presentLocation);
	// 		// Start tracking
	// 		if (updateIsShowUserLocation) {
	// 			updateIsShowUserLocation(true);
	// 		}
	// 		startLocationTracking((location: any) => {
	// 			// setLocations(prev => [...prev, location]);
	// 			if (location) {
	// 				updatePolylines(location);
	// 				// updateMarkersPosition(location);
	// 				// updateCurrentPosition(location);
	// 			} else {
	// 				// updateCurrentPosition(savedLocations);
	// 			}
	// 		});
	// 	};
	// 	init();
	// }, []);
	useEffect(() => {
		if (updatePolylines) {
			updatePolylines(currentPosition);
		}
	}, []);

	useEffect(() => {
		if (
			mapRef.current &&
			currentPosition &&
			currentPosition.latitude &&
			currentPosition.longitude
		) {
			mapRef.current.animateToRegion(
				{
					latitude: currentPosition.latitude,
					longitude: currentPosition.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				},
				1000
			);
		}
	}, [currentPosition]);

	// useEffect(() => {
	// 	getPolylinePointValues();
	// }, [
	// 	markersPosition[0]?.geometry?.coordinates[1],
	// 	markersPosition[0]?.geometry?.coordinates[0],
	// 	markersPosition[1]?.geometry?.coordinates[1],
	// 	markersPosition[1]?.geometry?.coordinates[0],
	// ]);

	// const getPolylinePointValues = async () => {
	// 	const data = await getDrivingRouteCoordinates(
	// 		markersPosition[0]?.geometry?.coordinates[1],
	// 		markersPosition[0]?.geometry?.coordinates[0],
	// 		markersPosition[1]?.geometry?.coordinates[1],
	// 		markersPosition[1]?.geometry?.coordinates[0]
	// 	);
	// 	if (updatePolylines) {
	// 		updatePolylines(data);
	// 	}
	// };

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		console.log('MapScreen is focused');
	// 		const delayAnimation = setTimeout(() => {
	// 			if (currentPosition && mapRef.current) {
	// 				console.log('Animating to region:', currentPosition);
	// 				mapRef.current.animateToRegion(
	// 					{
	// 						latitude: currentPosition.latitude,
	// 						longitude: currentPosition.longitude,
	// 						latitudeDelta: 0.01,
	// 						longitudeDelta: 0.01,
	// 					},
	// 					1000
	// 				);
	// 			}
	// 		}, 500); // Adjust delay as needed

	// 		return () => clearTimeout(delayAnimation); // Cleanup timeout
	// 	}, [currentPosition])
	// );

	// React.useEffect(() => {
	// 	const unsubscribe = navigation.addListener('beforeRemove', () => {
	// 		console.log('Navigating back to MapScreen');
	// 	});

	// 	return unsubscribe;
	// }, [navigation]);

	// console.log('markersPositionnnnnnnnnnnnnnnnnn', markersPosition);
	console.log(polylines, 'polylinesssssssssssssssssssss');
	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.mapContainer}
				showsUserLocation={isShowUserLocation}
				followsUserLocation={true}
				region={{
					// latitude: 1.28031596092652,
					// longitude: 103.79608018284,
					// latitude: currentPosition?.latitude || 2.28031596092652,
					// longitude: currentPosition?.longitude || 103.79608018284,
					latitude: currentPosition?.geometry?.coordinates[0] || 37.421998,
					longitude: currentPosition?.geometry?.coordinates[1] || -122.084,
					latitudeDelta: 0.2922,
					longitudeDelta: 0.2421,
					// latitudeDelta: 0.05,
					// longitudeDelta: 0.05,
					// latitudeDelta: 0.0922,
					// longitudeDelta: 0.0421,
				}}
			>
				{polylines && Array.isArray(polylines) && polylines.length > 0 && (
					<Polyline
						// coordinates={polylines?.geometry?.coordinates.map(
						// 	(polyline: { latitude: number; longitude: number }) => ({
						// 		latitude: polyline.latitude,
						// 		longitude: polyline.longitude,
						// 	})
						// )}
						// coordinates={polylines?.map((polyline: number[]) => ({
						// 	latitude: polyline[0],
						// 	longitude: polyline[1],
						// }))}
						coordinates={polylines?.map((polyline: any) => ({
							latitude: polyline.latitude,
							longitude: polyline.longitude,
						}))}
						strokeColor="red"
						strokeWidth={5}
					/>
				)}
				{/* {polylines?.geometry?.coordinates &&
					Array.isArray(polylines?.geometry?.coordinates) &&
					polylines?.geometry?.coordinates?.length > 0 && (
						<Polyline
							coordinates={polylines?.geometry?.coordinates?.map(
								(polyline: number[]) => ({
									latitude: polyline[1],
									longitude: polyline[0],
								})
							)}
							strokeColor="blue"
							strokeWidth={3}
						/>
					)} */}
				{Array.isArray(markersPosition) &&
					markersPosition.length > 0 &&
					markersPosition.map((markerPosition, index) => (
						<Marker
							key={index}
							draggable
							coordinate={{
								latitude: markerPosition?.geometry?.coordinates[0],
								longitude: markerPosition?.geometry?.coordinates[1],
							}}
							title="Current Location"
						/>
					))}
			</MapView>
			<TouchableOpacity
				onPress={() => props.navigation.navigate('Home')}
				style={[styles.buttonContainer, { left: 10 }]}
			>
				<View style={styles.cardTextContainer}>
					<Text>Back</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => props.navigation.navigate('SearchScreen')}
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
