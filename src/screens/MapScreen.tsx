import React, { useEffect, useState } from 'react';
import { View, Button, ViewStyle, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import MapView, { Polyline, Marker } from 'react-native-maps';

type MapScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'MapScreen'
>;

interface Props {
	navigation: MapScreenNavigationProp;
}

const MapScreen: React.FC<Props> = ({ navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						// latitudeDelta: 0.001,
						// longitudeDelta: 0.001,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
				</MapView>
			</View>
			{/* <MapView
                style={{ width: '100%', height: '100%' }}
                // showsUserLocation={true}
                // followsUserLocation={true}
                // initialRegion={{
                // 	latitude: currentPosition?.latitude || 0,
                // 	longitude: currentPosition?.longitude || 0,
                // 	latitudeDelta: 0.01,
                // 	longitudeDelta: 0.01,
                // }}
            /> */}
			{/* <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={{
                    latitude: currentPosition?.latitude || 0,
                    longitude: currentPosition?.longitude || 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {locations.length > 0 && (
                    <Polyline
                        coordinates={locations.map(loc => ({
                            latitude: loc.latitude,
                            longitude: loc.longitude,
                        }))}
                        strokeColor="#000"
                        strokeWidth={3}
                    />
                )}
                {currentPosition && (
                    <Marker coordinate={currentPosition} title="Current Location" />
                )}
            </MapView> */}
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: { flex: 1 },
});
