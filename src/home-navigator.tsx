import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';

export type RootStackParamList = {
	Home: undefined;
	Details: undefined;
	LiveTrackingMap: undefined;
	MapScreen: undefined;
	SearchScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{ animation: 'none', headerShown: false }}
			initialRouteName="Home"
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Details" component={DetailsScreen} />
			<Stack.Screen name="MapScreen" component={MapScreen} />
			<Stack.Screen name="SearchScreen" component={SearchScreen} />
		</Stack.Navigator>
	);
};
