import React from 'react';
import { View, Button, ViewStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'Home'
>;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
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
