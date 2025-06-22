import React, { useState } from 'react';
import {
	convertGeojsonSinglePoint,
	convertGeojsonPolyLines,
} from '../Utils/convertGeoJson';

export type LocationTypes = {
	latitude: number;
	longitude: number;
};
type converJsonType = {
	type: 'Feature';
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

	// actions
	updatePolylines: (newPolyline: any) => void;
	updateMarkersPosition: (newMarker: any) => void;
	updateCurrentPosition: (newPosition: any) => void;
	updateIsShowUserLocation?: (show: boolean) => void;
	updateSearchStartPoint?: (value: string) => void;
	updateSearchEndPoint?: (value: string) => void;
	updateStatePointDetails?: (details: any[]) => void;
	updateEndPointDetails?: (details: any[]) => void;
	selectedStartPoint?: (details: {}) => void;
	selectedEndPoint?: (details: {}) => void;
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

	const updatePolylines = (newPolylineData?: any) => {
		if (Array.isArray(newPolylineData) && newPolylineData[0].length > 0) {
			const convertedData = newPolylineData.map((coords: number[]) => {
				const [lng, lat] = coords;
				return { latitude: lat, longitude: lng };
			});
			const objectPolyLines = convertGeojsonPolyLines(
				convertedData,
				'linestring',
				`${
					selectedStartPointValue?.BUILDING?.toLowerCase() !== 'nil'
						? selectedStartPointValue.BUILDING
						: selectedStartPointValue.ADDRESS
				}-${
					selectedEndPointValue?.BUILDING?.toLowerCase() !== 'nil'
						? selectedEndPointValue.BUILDING
						: selectedEndPointValue.ADDRESS
				}-Driving-Route`
			);
			setPolylines({ ...objectPolyLines, type: 'Feature' });
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

	const updateSearchStartPoint = (value: string) => {
		setSearchStartPoint(value);
	};

	const updateSearchEndPoint = (value: string) => {
		setSearchEndPoint(value);
	};

	const updateIsShowUserLocation = (show: boolean) => {
		setIsShowUserLocation(show);
	};

	const updateStatePointDetails = (details: any) => {
		if (resetStartValue) {
			setStartPointDetails(details);
			setResetStartValue(false);
		} else {
			setStartPointDetails([...new Set([...startPointDetails, ...details])]);
		}
	};

	const updateEndPointDetails = (details: any) => {
		if (resetEndValue) {
			setEndPointDetails(details);
			setResetEndValue(false);
		} else {
			setEndPointDetails([...new Set([...endPointDetails, ...details])]);
		}
	};

	const selectedStartPoint = (selectedValue: any) => {
		setSelectedStartPointValue(selectedValue);
		updateMarkersPosition(selectedValue);
		updateCurrentPosition(selectedValue);

		if (selectedValue.BUILDING.toLowerCase() !== 'nil') {
			setSearchStartPoint(selectedValue.BUILDING);
		} else {
			setSearchStartPoint(selectedValue.ADDRESS);
		}
		setResetStartValue(true);
	};

	const selectedEndPoint = (selectedValue: any) => {
		setSelectedEndPointValue(selectedValue);
		updateMarkersPosition(selectedValue);
		if (selectedValue.BUILDING.toLowerCase() !== 'nil') {
			setSearchEndPoint(selectedValue.BUILDING);
		} else {
			setSearchEndPoint(selectedValue.ADDRESS);
		}
		setResetEndValue(true);
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
			}}
		>
			{children}
		</LocalStoreContext.Provider>
	);
};
