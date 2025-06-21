/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { requestStartUpPermission } from './src/Utils';
import { HomeNavigator } from './src/home-navigator';
import { LocalStoreContextProvider } from './src/context/LocalStoreContext';

function App() {
	React.useEffect(() => {
		const requestPermission = async () => {
			try {
				const permission = await requestStartUpPermission();
				if (
					permission &&
					permission['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
				) {
					requestStartUpPermission();
				}
			} catch (error) {
				console.error('Error requesting permission:', error);
			}
		};
		requestPermission();
	}, []);

	return (
		<NavigationContainer>
			<LocalStoreContextProvider>
				<HomeNavigator />
			</LocalStoreContextProvider>
		</NavigationContainer>
	);
}

export default App;
