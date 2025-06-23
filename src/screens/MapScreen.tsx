import React, { useContext, useEffect, useRef } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	Text,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { requestStartUpPermission, startLocationTracking } from '../Utils';
import { GetStoredDetails } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { RootStackParamList } from '../home-navigator';
import {
	LocalStoreContext,
	SearchPointType,
} from '../context/LocalStoreContext';
import { getDrivingRouteCoordinates } from '../services/api/locations';
import { useNetwork } from '../context';

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
		updateselectedPoints,
		updateSearchPoint,
	} = useContext(LocalStoreContext) as {
		polylines: any;
		markersPosition: any[];
		currentPosition: any;
		isShowUserLocation: boolean;
		updatePolylines: (location: any, localStroageRequired?: boolean) => void;
		updateMarkersPosition: (location: any) => void;
		updateCurrentPosition: (location: any) => void;
		updateIsShowUserLocation: (show: boolean) => void;
		updateselectedPoints: (details: {}) => void;
		updateSearchPoint?: (points: SearchPointType) => void;
	};
	const mapRef = useRef<MapView | null>(null);
	const { isConnected } = useNetwork();
	useEffect(() => {
		const init = async () => {
			const hasPermission = await requestStartUpPermission();
			if (!hasPermission) {
				Alert.alert('Permission Denied', 'Location access is required.');
				return;
			}
			// Load saved route
			if (!isConnected) {
				const searchPoints = await GetStoredDetails(keys.searchPoints);
				const selectedPoints = await GetStoredDetails(keys.selectedPoints);
				const polylinePoints = await GetStoredDetails(keys.polylinePoints);
				console.log(
					`searchPoints ${searchPoints} selectedPoints: ${selectedPoints} polylinePoints: ${polylinePoints}`
				);
				if (updateSearchPoint) {
					updateSearchPoint(searchPoints);
				}
				updateselectedPoints(selectedPoints);
				updatePolylines(polylinePoints, true);
			}
			// Start tracking
			if (updateIsShowUserLocation) {
				updateIsShowUserLocation(true);
			}
			startLocationTracking((location: any) => {
				// setLocations(prev => [...prev, location]);
				if (location) {
					getPolylinePointValues();
				} else {
					// updateCurrentPosition(savedLocations);
				}
			});
		};
		init();
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

	useEffect(() => {
		getPolylinePointValues();
	}, []);

	const getPolylinePointValues = async () => {
		if (
			markersPosition.length >= 2 &&
			markersPosition[0]?.geometry?.coordinates &&
			Array.isArray(markersPosition[0]?.geometry?.coordinates) &&
			markersPosition[1]?.geometry?.coordinates &&
			Array.isArray(markersPosition[1]?.geometry?.coordinates)
		) {
			const startLng = String(markersPosition[0].geometry.coordinates[1]);
			const startLat = String(markersPosition[0].geometry.coordinates[0]);
			const endLng = String(markersPosition[1].geometry.coordinates[1]);
			const endLat = String(markersPosition[1].geometry.coordinates[0]);
			const data = await getDrivingRouteCoordinates(
				startLng,
				startLat,
				endLng,
				endLat
			);
			if (updatePolylines) {
				updatePolylines(data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.mapContainer}
				showsUserLocation={isShowUserLocation}
				followsUserLocation={true}
				region={{
					latitude: currentPosition?.geometry?.coordinates[0] || 37.421998,
					longitude: currentPosition?.geometry?.coordinates[1] || -122.084,
					latitudeDelta: 0.12922,
					longitudeDelta: 0.02421,
				}}
			>
				{polylines?.geometry?.coordinates &&
					Array.isArray(polylines?.geometry?.coordinates) &&
					polylines?.geometry?.coordinates.length > 0 && (
						<Polyline
							coordinates={polylines?.geometry?.coordinates?.map(
								(polyline: any) => ({
									latitude: polyline.latitude,
									longitude: polyline.longitude,
								})
							)}
							strokeColor="blue"
							strokeWidth={5}
						/>
					)}
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
							title={markerPosition.properties.name}
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
		top: 50,
		zIndex: 1,
	},
});
