import React, { useState } from 'react';

export type LocationTypes = {
	latitude: number;
	longitude: number;
	timestamp: number;
};

interface LocalStoreContextProps {
	// states
	polylines?: LocationTypes[];
	markersPosition?: LocationTypes[] | null;
	currentPosition?: LocationTypes | null;
	isShowUserLocation?: boolean;
	searchStartPoint?: string;
	searchEndPoint?: string;
	startPointDetails?: any[];
	endPointDetails?: any[];

	// actions
	updatePolylines: (newPolyline: any) => void;
	updateMarkersPosition: (newMarker: LocationTypes) => void;
	updateCurrentPosition: (newPosition: LocationTypes) => void;
	updateIsShowUserLocation?: (show: boolean) => void;
	updateSearchStartPoint?: (value: string) => void;
	updateSearchEndPoint?: (value: string) => void;
	updateStatePointDetails?: (details: any[]) => void;
	updateEndPointDetails?: (details: any[]) => void;
}
export const LocalStoreContext = React.createContext(
	{} as LocalStoreContextProps
);
export const LocalStoreContextProvider: React.FC<
	React.PropsWithChildren<{}>
> = ({ children }) => {
	const [searchStartPoint, setSearchStartPoint] = useState<string>('');
	const [searchEndPoint, setSearchEndPoint] = useState<string>('');
	const [polylines, setPolylines] = useState<any[]>([]);
	const [markersPosition, setMarkersPosition] = useState<
		LocationTypes[] | null
	>(null);
	const [currentPosition, setCurrentPosition] = useState<LocationTypes | null>(
		null
	);
	const [isShowUserLocation, setIsShowUserLocation] = useState<boolean>(false);
	const [startPointDetails, setStartPointDetails] = useState<any[]>([]);
	const [endPointDetails, setEndPointDetails] = useState<any[]>([]);

	const updatePolylines = (newPolyline: any) => {
		// setPolylines(prev => (prev ? [...prev, newPolyline] : [newPolyline]));
		setPolylines([
			{
				latitude: 37.421998,
				longitude: -122.084,
				timestamp: Date.now(),
			},
			{
				latitude: 37.421898,
				longitude: -122.124,
				timestamp: Date.now(),
			},
			{
				latitude: 37.421798,
				longitude: -122.224,
				timestamp: Date.now(),
			},
		]);
	};

	const updateMarkersPosition = (newMarker: LocationTypes) => {
		// setMarkersPosition(prev => (prev ? [...prev, newMarker] : [newMarker]));
		setMarkersPosition([
			{
				latitude: 37.421998,
				longitude: -122.084,
				timestamp: Date.now(),
			},
			{
				latitude: 37.421898,
				longitude: -122.124,
				timestamp: Date.now(),
			},
			{
				latitude: 37.421798,
				longitude: -122.224,
				timestamp: Date.now(),
			},
		]);
	};

	const updateCurrentPosition = (newPosition: LocationTypes) => {
		setCurrentPosition(newPosition);
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
		setStartPointDetails([...startPointDetails, ...details]);
		console.log(details, 'details');
	};

	const updateEndPointDetails = (details: any) => {
		setEndPointDetails([...startPointDetails, ...details]);
		console.log(details, 'details');
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

				// actions
				updatePolylines,
				updateMarkersPosition,
				updateCurrentPosition,
				updateIsShowUserLocation,
				updateSearchStartPoint,
				updateSearchEndPoint,
				updateStatePointDetails,
				updateEndPointDetails,
			}}
		>
			{children}
		</LocalStoreContext.Provider>
	);
};
