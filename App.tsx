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
// import { Platform } from 'react-native';
// import LiveTrackingMapScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
export type RootStackParamList = {
	Home: undefined;
	Details: undefined;
	LiveTrackingMap: undefined;
	MapScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ animation: 'none', headerShown: false }}
				initialRouteName="Home"
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
				<Stack.Screen name="MapScreen" component={MapScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
