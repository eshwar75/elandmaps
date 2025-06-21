export async function getLocationCoordinates(
	query: string,
	pageNumber?: string
) {
	console.log('Fetching location coordinates for:', query);
	// try {
	// 	const response = await fetch(
	// 		`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
	// 			query
	// 		)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
	// 	);
	// 	if (!response.ok) {
	// 		throw new Error(`HTTP error! Status: ${response.status}`);
	// 	}
	// 	const data = await response.json();
	// 	return data;
	// } catch (error) {
	// 	console.log('Fetch error:', error);
	// 	return null;
	// }
	if (!query) {
		return;
	}
	try {
		const params = new URLSearchParams({
			searchVal: query,
			returnGeom: 'Y',
			getAddrDetails: 'Y',
			pageNum: pageNumber || '1',
			numOfResults: '30',
		});
		const response = await fetch(
			`https://www.onemap.gov.sg/api/common/elastic/search?${params.toString()}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data?.results || [];
	} catch (error) {
		console.error('API Error:', error);
	}
}

// import React, { useState, useCallback } from 'react';
// import {
// 	View,
// 	TextInput,
// 	FlatList,
// 	Text,
// 	TouchableOpacity,
// 	StyleSheet,
// } from 'react-native';
// import axios from 'axios';
// import debounce from 'lodash.debounce';
// import { useNavigation } from '@react-navigation/native';

// const LocationSearchScreen = () => {
// 	const [searchText, setSearchText] = useState('');
// 	const [results, setResults] = useState([]);
// 	const navigation = useNavigation();

// const fetchLocations = async query => {
// 	if (!query) {
// 		setResults([]);
// 		return;
// 	}
// 	try {
// 		const response = await axios.get(
// 			`https://www.onemap.gov.sg/api/common/elastic/search`,
// 			{
// 				params: {
// 					searchVal: query,
// 					returnGeom: 'Y',
// 					getAddrDetails: 'Y',
// 					pageNum: 1,
// 				},
// 			}
// 		);
// 		setResults(response.data.results || []);
// 	} catch (error) {
// 		console.error('API Error:', error);
// 	}
// };

// 	const debouncedFetch = useCallback(debounce(fetchLocations, 500), []);

// 	const handleChange = text => {
// 		setSearchText(text);
// 		debouncedFetch(text);
// 	};

// 	const handleSelect = item => {
// 		navigation.navigate('Screen1', { selectedLocation: item });
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<TextInput
// 				placeholder="Search location..."
// 				value={searchText}
// 				onChangeText={handleChange}
// 				style={styles.input}
// 			/>
// 			<FlatList
// 				data={results}
// 				keyExtractor={(item, index) => item.SEARCHVAL + index}
// 				renderItem={({ item }) => (
// 					<TouchableOpacity
// 						style={styles.item}
// 						onPress={() => handleSelect(item)}
// 					>
// 						<Text style={styles.title}>{item.SEARCHVAL}</Text>
// 						<Text style={styles.subtitle}>{item.ADDRESS}</Text>
// 					</TouchableOpacity>
// 				)}
// 			/>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: { flex: 1, padding: 10 },
// 	input: {
// 		height: 50,
// 		borderColor: '#ccc',
// 		borderWidth: 1,
// 		borderRadius: 8,
// 		paddingHorizontal: 10,
// 		marginBottom: 10,
// 	},
// 	item: {
// 		paddingVertical: 10,
// 		borderBottomColor: '#eee',
// 		borderBottomWidth: 1,
// 	},
// 	title: { fontSize: 16, fontWeight: 'bold' },
// 	subtitle: { fontSize: 14, color: '#555' },
// });

// export default LocationSearchScreen;
