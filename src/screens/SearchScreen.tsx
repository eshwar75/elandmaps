import React, { useContext, useEffect } from 'react';
import {
	TextInput,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import useDebounce from '../hooks/useDebounce';
import { getLocationCoordinates } from '../services/api/locations';
import { StoreObject } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { ButtonOpacity, CardButtonOpacity } from '../components';

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'SearchScreen'
>;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const {
		searchStartPoint,
		searchEndPoint,
		startPointDetails,
		markersPosition,
		endPointDetails,
		updateSearchStartPoint,
		updateSearchEndPoint,
		updateStatePointDetails,
		updateEndPointDetails,
		selectedStartPoint,
		selectedEndPoint,
	} = useContext(LocalStoreContext);
	const startPointValue = useDebounce(searchStartPoint, 1000);
	const endPointValue = useDebounce(searchEndPoint, 1000);

	useEffect(() => {
		getStartPointValues(startPointValue);
	}, [startPointValue]);

	useEffect(() => {
		getEndPointValues(endPointValue);
	}, [endPointValue]);

	const getStartPointValues = async (value: string) => {
		const data = await getLocationCoordinates(value);
		if (updateStatePointDetails) {
			updateStatePointDetails(data);
		}
	};

	const getEndPointValues = async (value: string) => {
		const data = await getLocationCoordinates(value);
		if (updateEndPointDetails) {
			updateEndPointDetails(data);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={updateSearchStartPoint}
				value={searchStartPoint}
				placeholder="Start point"
				keyboardType="default"
			/>
			<TextInput
				style={styles.input}
				onChangeText={updateSearchEndPoint}
				value={searchEndPoint}
				placeholder="End Point"
				keyboardType="default"
			/>
			<ButtonOpacity
				onPress={async () => {
					if (updateStatePointDetails) {
						updateStatePointDetails([]);
					}
					if (updateEndPointDetails) {
						updateEndPointDetails([]);
					}
					StoreObject(`${keys.searchPoints}`, {
						startPoint: searchStartPoint,
						endPoint: searchEndPoint,
					});
					setTimeout(() => {
						navigation.navigate('MapScreen');
					}, 2000);
				}}
				title="Search"
			/>

			{Array.isArray(startPointDetails) && startPointDetails.length > 0 && (
				<View style={styles.listContainer}>
					<FlatList
						data={startPointDetails}
						renderItem={({ item }) => (
							<CardButtonOpacity
								onPress={() => selectedStartPoint && selectedStartPoint(item)}
								title={
									item.BUILDING.toLowerCase() !== 'nil' ? item.BUILDING : ''
								}
								subTitle={item.ADDRESS || ''}
							/>
						)}
						keyExtractor={(item, index) =>
							item.id?.toString() || index.toString()
						}
					/>
				</View>
			)}

			{Array.isArray(endPointDetails) && endPointDetails.length > 0 && (
				<View style={styles.listContainer}>
					<FlatList
						data={endPointDetails}
						renderItem={({ item }) => (
							<CardButtonOpacity
								onPress={() => selectedEndPoint && selectedEndPoint(item)}
								title={
									item.BUILDING.toLowerCase() !== 'nil' ? item.BUILDING : ''
								}
								subTitle={item.ADDRESS || ''}
							/>
						)}
						keyExtractor={(item, index) =>
							item.id?.toString() || index.toString()
						}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		// top: 60,
		marginInline: 20,
		marginBlock: 10,
	},
	listContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgb(209, 155, 155)',
		marginHorizontal: 20,
	},
	input: {
		height: 40,
		marginVertical: 12,
		borderWidth: 1,
		paddingInline: 20,
		paddingBlock: 30,
		borderRadius: 5,
		width: '100%',
	},
	buttonContainer: {
		// position: 'absolute',
		// top: 10,
		// zIndex: 1,
	},
	cardTextContainer: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		elevation: 3,
	},
	buttonNormalContainer: {
		backgroundColor: 'blue',
		borderRadius: 5,
		marginVertical: 20,
		width: 'auto',
	},
	buttonNormalTextContainer: {
		padding: 10,
		borderRadius: 5,
		// elevation: 3,
	},
	buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
