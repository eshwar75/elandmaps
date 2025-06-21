import React, { useContext, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getCurrentLocation, requestStartUpPermission } from '../Utils';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'Home'
>;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	const { updateCurrentPosition } = useContext(LocalStoreContext);
	useEffect(() => {
		const init = async () => {
			try {
				const hasPermission = await requestStartUpPermission();
				if (!hasPermission) {
					Alert.alert('Permission Denied', 'Location access is required.');
					return;
				} else {
					console.log('Permission granted');
					getCurrentLocation((location: any) => {
						// setLocations(prev => [...prev, location]);
						// setLocations([...locations, location]);
						updateCurrentPosition(location);
					});
				}
			} catch (error) {
				console.error('Error initializing HomeScreen:', error);
			}
		};
		init();
	}, []);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Details')}
				style={styles.buttonContainer}
			>
				<View style={styles.cardTextContainer}>
					<Text style={styles.buttonText}>Details</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate('MapScreen')}
				style={styles.buttonContainer}
			>
				<View style={styles.cardTextContainer}>
					<Text style={styles.buttonText}>Maps</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	mapContainer: { flex: 1 },
	cardTextContainer: {
		padding: 10,
		borderRadius: 5,
		elevation: 3,
	},
	buttonContainer: {
		backgroundColor: 'blue',
		borderRadius: 5,
		margin: 10,
		width: '50%',
	},
	buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
