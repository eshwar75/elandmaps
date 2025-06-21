import React, { useContext, useEffect, useState } from 'react';
import {
	TextInput,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import useDebounce from '../hooks/useDebounce';
import { getLocationCoordinates } from '../services/api/locations';

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
		endPointDetails,
		updateSearchStartPoint,
		updateSearchEndPoint,
		updateStatePointDetails,
		updateEndPointDetails,
	} = useContext(LocalStoreContext);
	const startPointValue = useDebounce(searchStartPoint, 1500);
	const endPointValue = useDebounce(searchEndPoint, 500);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		if (startPointValue.length > 3) {
			getStartPointValues(startPointValue);
		}
	}, [startPointValue]);
	useEffect(() => {
		if (endPointValue.length > 3) {
			getEndPointValues(endPointValue);
		}
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
			{/* <TouchableOpacity
				onPress={() => navigation.navigate('MapScreen')}
				style={[styles.buttonContainer, { left: 10 }]}
			>
				<View style={styles.cardTextContainer}>
					<Text>Back</Text>
				</View>
			</TouchableOpacity> */}
			{/* <View style={{ top: 60 }}> */}
			{/* <View style={styles.container}> */}
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
			{Array.isArray(startPointDetails) && startPointDetails.length > 0 && (
				<View style={styles.listContainer}>
					<FlatList
						data={startPointDetails}
						renderItem={({ item }) => (
							<TouchableOpacity style={{ padding: 16 }}>
								{item.BUILDING && item.BUILDING.toLowerCase() !== 'nil' && (
									<Text style={styles.listTitle}>{item.BUILDING}</Text>
								)}
								<Text style={styles.listSubTitle}>{item.ADDRESS || '-'}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) =>
							item.id?.toString() || index.toString()
						}
						// onEndReached={() => getLocationCoordinates(startPointValue)}
						// onEndReachedThreshold={0.5}
						// ListFooterComponent={() => {
						// 	return loading ? (
						// 		<ActivityIndicator style={{ margin: 10 }} />
						// 	) : null;
						// }}
					/>
				</View>
			)}

			{Array.isArray(endPointDetails) && endPointDetails.length > 0 && (
				<View style={styles.listContainer}>
					<FlatList
						data={endPointDetails}
						renderItem={({ item }) => (
							<TouchableOpacity style={{ padding: 16 }}>
								{item.BUILDING && item.BUILDING.toLowerCase() !== 'nil' && (
									<Text style={styles.listTitle}>{item.BUILDING}</Text>
								)}
								<Text style={styles.listSubTitle}>{item.ADDRESS || '-'}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) =>
							item.id?.toString() || index.toString()
						}
						// onEndReached={() => getLocationCoordinates(startPointValue)}
						// onEndReachedThreshold={0.5}
						// ListFooterComponent={() => {
						// 	return loading ? (
						// 		<ActivityIndicator style={{ margin: 10 }} />
						// 	) : null;
						// }}
					/>
				</View>
			)}

			{/* </View> */}
			{/* <TouchableOpacity
				onPress={() => navigation.navigate('MapScreen')}
				style={styles.buttonNormalContainer}
			>
				<View style={styles.buttonNormalTextContainer}>
					<Text style={styles.buttonText}>Search</Text>
				</View>
			</TouchableOpacity> */}
			{/* </View> */}
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
	listTitle: {
		// color: 'rgb(209, 207, 201)',
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: 600,
	},
	listSubTitle: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: 500,
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
		margin: 10,
		width: '50%',
	},
	buttonNormalTextContainer: {
		padding: 10,
		borderRadius: 5,
		// elevation: 3,
	},
	buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
