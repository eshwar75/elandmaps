import React, { useContext, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getCurrentLocation, requestStartUpPermission } from '../Utils';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import { ButtonOpacity } from '../components';

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
					getCurrentLocation((location: any) => {
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
			<ButtonOpacity
				onPress={() => navigation.navigate('Details')}
				title="Details"
			/>
			<ButtonOpacity
				onPress={() => navigation.navigate('MapScreen')}
				title="Maps"
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
