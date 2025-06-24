import React, { useState } from 'react';
import {
	convertGeojsonSinglePoint,
	convertGeojsonPolyLines,
} from '../Utils/convertGeoJson';
import { GetStoredDetails, StoreObject } from '../services/usage';
import { keys } from '../services/usage/keytypes';
import { normalizedKeys, removeDuplicatePointDetails } from '../Utils';

export type LocationTypes = {
	latitude: number;
	longitude: number;
};
export type SearchPointType = {
	startPoint: string;
	endPoint: string;
};
type converJsonType = {
	type: string;
	timestamp: string;
	geometry: { type: string; coordinates: LocationTypes[][] };
	properties: { name: string };
};

interface LocalStoreContextProps {
	// states
	polylines?: converJsonType;
	markersPosition?: any[] | null;
	currentPosition?: any | null;
	isShowUserLocation?: boolean;
	searchStartPoint?: string;
	searchEndPoint?: string;
	startPointDetails?: any[];
	endPointDetails?: any[];
	selectedStartPointValue?: {};
	selectedEndPointValue?: {};
	isInputFocus?: string;
	zoominPosition?: any;

	// actions
	updatePolylines: (newPolyline: any, localStroageRequired?: boolean) => void;
	updateMarkersPosition: (newMarker: any) => void;
	updateCurrentPosition: (newPosition: any) => void;
	updateIsShowUserLocation?: (show: boolean) => void;
	updateSearchStartPoint?: (value: string) => void;
	updateSearchEndPoint?: (value: string) => void;
	updateStatePointDetails?: (details: any[]) => void;
	updateEndPointDetails?: (details: any[]) => void;
	selectedStartPoint?: (details: {}) => void;
	selectedEndPoint?: (details: {}) => void;
	updateselectedPoints?: (details: {}) => void;
	updateSearchPoint?: (points: SearchPointType) => void;
	updateOnInputFocus?: (value: string) => void;
	noNetworkPresent?: (isNetworkPresent: boolean) => void;
	updateZoominPosition?: (newPosition: any) => void;
	getLocalStorageSearchpoints?: (isNetworkPresent: boolean) => void;
}
export const LocalStoreContext = React.createContext(
	{} as LocalStoreContextProps
);
export const LocalStoreContextProvider: React.FC<
	React.PropsWithChildren<{}>
> = ({ children }) => {
	const [searchStartPoint, setSearchStartPoint] = useState<string>('');
	const [searchEndPoint, setSearchEndPoint] = useState<string>('');
	const [polylines, setPolylines] = useState<converJsonType>();
	const [markersPosition, setMarkersPosition] = useState<any[]>([]);
	const [currentPosition, setCurrentPosition] = useState<any>(null);
	const [isShowUserLocation, setIsShowUserLocation] = useState<boolean>(false);
	const [startPointDetails, setStartPointDetails] = useState<any[]>([]);
	const [endPointDetails, setEndPointDetails] = useState<any[]>([]);
	const [selectedStartPointValue, setSelectedStartPointValue] = useState<any>(
		{}
	);
	const [selectedEndPointValue, setSelectedEndPointValue] = useState<any>({});
	const [resetStartValue, setResetStartValue] = useState(false);
	const [resetEndValue, setResetEndValue] = useState(false);
	const [isInputFocus, setIsInputFocus] = useState<string>('');
	const [zoominPosition, setZoominPosition] = useState<any>(null);

	const updatePolylines = (
		newPolylineData: any,
		localStroageRequired?: boolean
	) => {
		if (Array.isArray(newPolylineData) && newPolylineData[0].length > 0) {
			const convertedData = newPolylineData.map((coords: number[]) => {
				const [lng, lat] = coords;
				return { latitude: lat, longitude: lng };
			});
			const objectPolyLines = convertGeojsonPolyLines(
				convertedData,
				'linestring',
				`${
					selectedStartPointValue?.building?.toLowerCase() !== 'nil'
						? selectedStartPointValue.building
						: selectedStartPointValue.address
				}-${
					selectedEndPointValue?.building?.toLowerCase() !== 'nil'
						? selectedEndPointValue.building
						: selectedEndPointValue.address
				}-Driving-Route`
			);
			if (!localStroageRequired) {
				StoreObject(`${keys.polylinePoints}`, newPolylineData);
				StoreObject(`${keys.selectedPoints}`, {
					startPoint: selectedStartPointValue,
					endPoint: selectedEndPointValue,
				});
			}
			setPolylines(objectPolyLines);
		}
	};

	const updateMarkersPosition = (newMarker: any) => {
		const markerPositionPoint = convertGeojsonSinglePoint(newMarker, 'Point');
		setMarkersPosition((prev: any) =>
			prev ? [...prev, markerPositionPoint] : [markerPositionPoint]
		);
	};

	const updateCurrentPosition = (newPosition: any) => {
		const currentPositionPoint = convertGeojsonSinglePoint(
			newPosition,
			'Point'
		);
		setCurrentPosition(currentPositionPoint);
	};

	const updateZoominPosition = (newPosition: any) => {
		const currentPositionPoint = convertGeojsonSinglePoint(
			newPosition,
			'Point'
		);
		setZoominPosition(currentPositionPoint);
	};

	const updateSearchPoint = (points: SearchPointType) => {
		updateSearchStartPoint(points.startPoint);
		updateSearchEndPoint(points.endPoint);
	};

	const updateSearchStartPoint = (value: string) => {
		if (typeof value === 'string' && value.length === 0) {
			setStartPointDetails([]);
		}
		setSearchStartPoint(value);
	};

	const updateSearchEndPoint = (value: string) => {
		if (typeof value === 'string' && value.length === 0) {
			setEndPointDetails([]);
		}
		setSearchEndPoint(value);
	};

	const updateIsShowUserLocation = (show: boolean) => {
		setIsShowUserLocation(show);
	};

	const updateStatePointDetails = (details: any) => {
		if (resetStartValue) {
			const removedDuplicateData = removeDuplicatePointDetails(details);
			setStartPointDetails(removedDuplicateData || []);
			setResetStartValue(false);
		} else {
			const removedDuplicateData = removeDuplicatePointDetails([
				...startPointDetails,
				...details,
			]);
			setStartPointDetails(removedDuplicateData || []);
		}
	};

	const updateEndPointDetails = (details: any) => {
		if (resetEndValue) {
			const removedDuplicateData = removeDuplicatePointDetails(details);
			setEndPointDetails(removedDuplicateData || []);
			setResetEndValue(false);
		} else {
			const removedDuplicateData = removeDuplicatePointDetails([
				...endPointDetails,
				...details,
			]);
			setEndPointDetails(removedDuplicateData);
		}
	};

	const updateselectedPoints = (selectedValue: any) => {
		selectedStartPoint(selectedValue?.startPoint);
		selectedEndPoint(selectedValue?.endPoint);
	};

	const selectedStartPoint = (selectedValue: any) => {
		const keysNormlized: any = normalizedKeys(selectedValue);
		setSelectedStartPointValue(keysNormlized);
		updateMarkersPosition(keysNormlized);
		updateZoominPosition(keysNormlized);

		if (keysNormlized && keysNormlized?.building?.toLowerCase() !== 'nil') {
			setSearchStartPoint(keysNormlized?.building);
		} else {
			setSearchStartPoint(keysNormlized?.address);
		}
		setResetStartValue(true);
	};

	const selectedEndPoint = (selectedValue: any) => {
		const keysNormlized: any = normalizedKeys(selectedValue);
		setSelectedEndPointValue(keysNormlized);
		updateMarkersPosition(keysNormlized);
		if (keysNormlized && keysNormlized?.building?.toLowerCase() !== 'nil') {
			setSearchEndPoint(keysNormlized?.building);
		} else {
			setSearchEndPoint(keysNormlized?.address);
		}
		setResetEndValue(true);
	};

	const updateOnInputFocus = (value: string) => {
		setIsInputFocus(value);
	};

	const noNetworkPresent = async (isNetworkPresent: boolean) => {
		if (
			!isNetworkPresent &&
			(!markersPosition ||
				(Array.isArray(markersPosition) && markersPosition.length === 0))
		) {
			const selectedPoints = await GetStoredDetails(keys.selectedPoints);
			const dirvingRoute = await GetStoredDetails(keys.polylinePoints);

			updateselectedPoints(selectedPoints);
			setPolylines(dirvingRoute);
		}
	};

	const getLocalStorageSearchpoints = async (isNetworkPresent: boolean) => {
		if (!isNetworkPresent) {
			const searchPoints = await GetStoredDetails(keys.searchPoints);
			if (searchPoints) {
				updateSearchPoint(searchPoints);
			}
		}
	};

	return (
		<LocalStoreContext.Provider
			value={{
				// states
				polylines,
				markersPosition,
				currentPosition,
				isShowUserLocation,
				searchStartPoint,
				searchEndPoint,
				startPointDetails,
				endPointDetails,
				selectedStartPointValue,
				selectedEndPointValue,
				isInputFocus,
				zoominPosition,

				// actions
				updatePolylines,
				updateMarkersPosition,
				updateCurrentPosition,
				updateIsShowUserLocation,
				updateSearchStartPoint,
				updateSearchEndPoint,
				updateStatePointDetails,
				updateEndPointDetails,
				selectedStartPoint,
				selectedEndPoint,
				updateselectedPoints,
				updateSearchPoint,
				updateOnInputFocus,
				noNetworkPresent,
				updateZoominPosition,
				getLocalStorageSearchpoints,
			}}
		>
			{children}
		</LocalStoreContext.Provider>
	);
};
