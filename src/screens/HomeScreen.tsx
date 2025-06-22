import React, { useContext, useEffect } from 'react';
import { View, Alert, StyleSheet, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getCurrentLocation, requestStartUpPermission } from '../Utils';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import { ButtonOpacity } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

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
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
			<ButtonOpacity
				onPress={() => navigation.navigate('Details')}
				title="Details"
			/>
			<ButtonOpacity
				onPress={() => navigation.navigate('MapScreen')}
				title="Maps"
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
