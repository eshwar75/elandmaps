import React, { useContext, useEffect } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	StatusBar,
	KeyboardAvoidingView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../home-navigator';
import { LocalStoreContext } from '../context/LocalStoreContext';
import useDebounce from '../hooks/useDebounce';
import { getLocationCoordinates } from '../services/api/locations';
import { GetStoredDetails, StoreObject } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { ButtonOpacity, CardButtonOpacity } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import { useNetwork } from '../context';
import { normalizedKeys } from '../Utils';

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'SearchScreen'
>;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const { isConnected } = useNetwork();
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
		isInputFocus,
		updateOnInputFocus,
		noNetworkPresent,
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
		<SafeAreaView style={[styles.FullDisplay, styles.container]}>
			<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
			<View style={{ padding: 2, backgroundColor: '#FFFFFF' }}>
				<ButtonOpacity
					onPress={() => navigation.navigate('MapScreen')}
					title={'Back'}
					width="20%"
					backgroundColor="#F0EEED"
					color=""
				/>
			</View>
			<View style={[styles.containContainer, styles.FullDisplay]}>
				<KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
					<Input
						value={searchStartPoint || ''}
						onChange={updateSearchStartPoint || (() => {})}
						placeholder="Start point"
						onInputFocus={() =>
							updateOnInputFocus && updateOnInputFocus('start_point')
						}
					/>
				</KeyboardAvoidingView>
				<KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
					<Input
						value={searchEndPoint || ''}
						onChange={updateSearchEndPoint || (() => {})}
						placeholder="End point"
						onInputFocus={() =>
							updateOnInputFocus && updateOnInputFocus('end_point')
						}
					/>
				</KeyboardAvoidingView>
				<ButtonOpacity
					onPress={() => {
						if (updateStatePointDetails) {
							updateStatePointDetails([]);
						}
						if (updateEndPointDetails) {
							updateEndPointDetails([]);
						}
						if (isConnected) {
							StoreObject(`${keys.searchPoints}`, {
								startPoint: searchStartPoint,
								endPoint: searchEndPoint,
							});
						}
						if (!isConnected) {
							noNetworkPresent && noNetworkPresent(isConnected || false);
						}

						setTimeout(() => {
							navigation.navigate('MapScreen');
						}, 1000);
					}}
					title="Search"
					isDisabed={searchStartPoint || searchEndPoint ? false : true}
				/>

				{(isInputFocus === 'start_point' || isInputFocus === 'end_point') && (
					<>
						{isInputFocus === 'start_point' &&
							Array.isArray(startPointDetails) &&
							startPointDetails.length > 0 && (
								<View style={[styles.FullDisplay, styles.listContainer]}>
									<FlatList
										data={startPointDetails}
										renderItem={({ item }) => (
											<CardButtonOpacity
												onPress={() =>
													selectedStartPoint && selectedStartPoint(item)
												}
												title={
													item.BUILDING.toLowerCase() !== 'nil'
														? item.BUILDING
														: ''
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

						{isInputFocus === 'end_point' &&
							Array.isArray(endPointDetails) &&
							endPointDetails.length > 0 && (
								<View style={[styles.FullDisplay, styles.listContainer]}>
									<FlatList
										data={endPointDetails}
										renderItem={({ item }) => (
											<CardButtonOpacity
												onPress={() =>
													selectedEndPoint && selectedEndPoint(item)
												}
												title={
													item.BUILDING.toLowerCase() !== 'nil'
														? item.BUILDING
														: ''
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
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	FullDisplay: { flex: 1 },
	container: { backgroundColor: '#F0EEED' },
	containContainer: { padding: 20, alignItems: 'center' },
	listContainer: {
		width: '100%',
		marginTop: 10,
		backgroundColor: 'rgb(209, 155, 155)',
		marginHorizontal: 20,
		borderRadius: 6,
	},
});
