import React, { useEffect } from 'react';
import { View, Button, ViewStyle, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getCurrentLocation, requestStartUpPermission } from '../Utils';

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'Home'
>;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	useEffect(() => {
		const init = async () => {
			try {
				const hasPermission = await requestStartUpPermission();
				if (!hasPermission) {
					Alert.alert('Permission Denied', 'Location access is required.');
					return;
				} else {
					console.log('Permission granted');
					getCurrentLocation();
				}
			} catch (error) {
				console.error('Error initializing HomeScreen:', error);
			}
		};
		init();
	}, []);

	return (
		<View style={container}>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/>
			<Button
				title="Go to MapScreen"
				onPress={() => navigation.navigate('MapScreen')}
			/>
		</View>
	);
};

export default HomeScreen;

const container: ViewStyle = {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
};
