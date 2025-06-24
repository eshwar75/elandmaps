/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { requestStartUpPermission } from './src/Utils';
import { HomeNavigator } from './src/home-navigator';
import { LocalStoreContextProvider, NetworkProvider } from './src/context';
import {
	SafeAreaProvider,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

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
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<NavigationContainer>
				<NetworkProvider>
					<LocalStoreContextProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<HomeNavigator />
						</GestureHandlerRootView>
					</LocalStoreContextProvider>
				</NetworkProvider>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default App;
