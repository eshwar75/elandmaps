import React, { useState } from 'react';
import {
	convertGeojsonSinglePoint,
	convertGeojsonPolyLines,
} from '../Utils/convertGeoJson';
import { getDrivingRouteCoordinates } from '../services/api/locations';

export type LocationTypes = {
	latitude: number;
	longitude: number;
	timestamp: number;
};

interface LocalStoreContextProps {
	// states
	polylines?: any[];
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
	const [polylines, setPolylines] = useState<LocationTypes[]>([]);
	const [markersPosition, setMarkersPosition] = useState<any[]>([]);
	const [currentPosition, setCurrentPosition] = useState<any>(null);
	const [isShowUserLocation, setIsShowUserLocation] = useState<boolean>(false);
	const [startPointDetails, setStartPointDetails] = useState<any[]>([]);
	const [endPointDetails, setEndPointDetails] = useState<any[]>([]);
	const [selectedStartPointValue, setSelectedStartPointValue] = useState<{}>(
		{}
	);
	const [selectedEndPointValue, setSelectedEndPointValue] = useState<{}>({});
	const [resetStartValue, setResetStartValue] = useState(false);
	const [resetEndValue, setResetEndValue] = useState(false);

	// const getPolylinePointValues = async (value: string) => {
	// 	const data = await getDrivingRouteCoordinates(value);
	// 	if (updateStatePointDetails) {
	// 		// http://router.project-osrm.org/route/v1/driving/{startLng},{startLat};{endLng},{endLat}?overview=full&geometries=geojson
	// 		updateStatePointDetails(data);
	// 	}
	// };

	const updatePolylines = async (newPolyline?: any) => {
		const data = await getDrivingRouteCoordinates(
			markersPosition[0]?.geometry?.coordinates[1],
			markersPosition[0]?.geometry?.coordinates[0],
			markersPosition[1]?.geometry?.coordinates[1],
			markersPosition[1]?.geometry?.coordinates[0]
		);
		// setPolylines(data);
		// console.log(data, 'dataaaaaaaaaaaaaaaaaa');
		const converdata = [
			[103.819873, 1.30238],
			[103.819936, 1.302424],
			[103.820247, 1.302575],
			[103.820869, 1.302883],
			[103.821235, 1.303068],
			[103.82141, 1.303166],
			[103.821571, 1.303283],
			[103.821628, 1.303349],
			[103.821683, 1.30341],
			[103.821726, 1.303461],
			[103.821753, 1.303516],
			[103.821816, 1.30365],
			[103.821879, 1.303784],
			[103.822001, 1.304075],
			[103.822003, 1.304159],
			[103.82205, 1.304265],
			[103.82211, 1.304388],
			[103.82219, 1.304566],
			[103.822285, 1.304687],
			[103.822418, 1.304814],
			[103.822644, 1.304946],
			[103.822712, 1.304986],
			[103.82286, 1.305041],
			[103.822933, 1.305066],
			[103.82309, 1.305109],
			[103.823658, 1.305296],
			[103.823789, 1.305305],
			[103.824374, 1.30533],
			[103.824536, 1.305354],
			[103.8248, 1.305419],
			[103.824986, 1.305504],
			[103.825198, 1.305601],
			[103.825553, 1.305818],
			[103.825655, 1.305878],
			[103.826031, 1.306101],
			[103.826109, 1.30616],
			[103.82614, 1.306183],
			[103.826703, 1.306605],
			[103.826995, 1.306819],
			[103.827074, 1.306876],
			[103.827102, 1.306894],
			[103.827127, 1.30691],
			[103.827165, 1.306934],
			[103.827174, 1.30694],
			[103.827353, 1.307051],
			[103.827446, 1.307095],
			[103.827563, 1.307134],
			[103.8277, 1.307151],
			[103.827721, 1.307149],
			[103.827772, 1.307144],
			[103.827825, 1.307136],
			[103.827883, 1.307122],
			[103.827941, 1.307099],
			[103.8281, 1.307022],
			[103.82841, 1.306873],
			[103.828467, 1.306845],
			[103.828674, 1.306745],
			[103.828701, 1.306733],
			[103.82874, 1.306815],
			[103.828781, 1.3069],
			[103.828881, 1.307112],
			[103.828903, 1.307153],
			[103.82896, 1.307181],
			[103.828984, 1.307225],
			[103.829072, 1.307418],
			[103.829152, 1.30759],
			[103.829168, 1.307625],
			[103.829218, 1.307748],
			[103.829275, 1.307837],
			[103.82933, 1.307887],
			[103.829373, 1.307913],
			[103.829403, 1.307925],
			[103.829449, 1.307937],
			[103.829514, 1.307957],
			[103.829585, 1.307965],
			[103.829695, 1.307923],
			[103.829716, 1.307916],
			[103.829758, 1.307897],
			[103.829799, 1.307909],
			[103.829839, 1.307892],
			[103.829894, 1.307864],
			[103.829924, 1.307852],
			[103.830225, 1.307696],
			[103.83032, 1.307643],
			[103.830469, 1.307563],
			[103.830521, 1.307537],
			[103.830613, 1.307491],
			[103.830716, 1.30744],
			[103.830963, 1.307319],
			[103.831091, 1.307263],
			[103.831206, 1.307267],
			[103.831283, 1.307295],
			[103.831438, 1.307382],
			[103.831522, 1.307568],
			[103.831555, 1.307641],
			[103.83164, 1.307836],
			[103.831671, 1.307897],
			[103.831681, 1.307918],
			[103.831751, 1.308069],
			[103.831761, 1.308093],
			[103.831801, 1.308197],
			[103.831842, 1.308367],
			[103.831899, 1.308619],
			[103.831988, 1.309012],
			[103.832041, 1.309243],
			[103.832075, 1.309397],
			[103.832047, 1.309502],
			[103.832028, 1.30955],
			[103.831998, 1.309599],
			[103.831963, 1.309668],
			[103.831586, 1.309845],
			[103.831473, 1.309911],
			[103.831416, 1.309952],
			[103.83135, 1.309993],
			[103.831299, 1.310036],
			[103.831278, 1.310063],
			[103.831265, 1.31008],
			[103.831202, 1.310185],
			[103.831013, 1.310634],
			[103.830871, 1.311083],
			[103.830811, 1.311346],
			[103.830795, 1.311487],
			[103.830791, 1.311555],
			[103.830795, 1.311609],
			[103.8308, 1.311673],
			[103.830827, 1.311767],
			[103.83092, 1.311962],
			[103.831122, 1.31232],
			[103.831128, 1.3124],
			[103.831153, 1.31252],
			[103.83116, 1.312555],
			[103.830714, 1.312671],
			[103.829779, 1.312903],
			[103.82993, 1.313016],
			[103.829994, 1.313073],
			[103.830088, 1.313161],
			[103.830347, 1.313399],
			[103.830425, 1.313469],
			[103.830536, 1.313574],
			[103.8309, 1.31388],
			[103.831315, 1.314214],
			[103.831263, 1.314285],
			[103.831163, 1.314407],
		];

		const converted = converdata.map((coords: number[]) => {
			const [lng, lat] = coords;
			return {
				latitude: lat,
				longitude: lng,
				timestamp: Date.now()
			};
		});
		setPolylines(converted);

		// console.log(converted);

		// setPolylines(converdata);
		// if (updateStatePointDetails) {
		// 	// http://router.project-osrm.org/route/v1/driving/{startLng},{startLat};{endLng},{endLat}?overview=full&geometries=geojson
		// 	updateStatePointDetails(data);
		// }
		// setPolylines(prev => (prev ? [...prev, newPolyline] : [newPolyline]));
		// setPolylines([
		// 	{
		// 		latitude: 37.421998,
		// 		longitude: -122.084,
		// 		timestamp: Date.now(),
		// 	},
		// 	{
		// 		latitude: 37.421898,
		// 		longitude: -122.124,
		// 		timestamp: Date.now(),
		// 	},
		// 	{
		// 		latitude: 37.421798,
		// 		longitude: -122.224,
		// 		timestamp: Date.now(),
		// 	},
		// ]);
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
		console.log(details, 'details');
	};

	const updateEndPointDetails = (details: any) => {
		if (resetEndValue) {
			setEndPointDetails(details);
			setResetEndValue(false);
		} else {
			setEndPointDetails([...new Set([...endPointDetails, ...details])]);
		}
		console.log(details, 'details');
	};

	const selectedStartPoint = (selectedValue: any) => {
		console.log(selectedValue, 'selectedValueeeeeeeeeeeeeeeeeeeee starta');
		setSelectedStartPointValue(selectedValue);
		updateMarkersPosition(selectedValue);
		updateCurrentPosition(selectedValue);
		// updateMarkersPosition({
		// 	latitude: parseFloat(selectedValue.LATITUDE),
		// 	longitude: parseFloat(selectedValue.LONGITUDE),
		// 	timestamp: Date.now(),
		// });
		// updateCurrentPosition({
		// 	latitude: parseFloat(selectedValue.LATITUDE),
		// 	longitude: parseFloat(selectedValue.LONGITUDE),
		// 	timestamp: Date.now(),
		// });

		if (selectedValue.BUILDING.toLowerCase() !== 'nil') {
			setSearchStartPoint(selectedValue.BUILDING);
		} else {
			setSearchStartPoint(selectedValue.ADDRESS);
		}
		setResetStartValue(true);
		console.log('selectedValue', selectedValue);
	};

	const selectedEndPoint = (selectedValue: any) => {
		console.log(selectedValue, 'selectedValueeeeeeeeeeeeeeeeeeeee end');
		setSelectedEndPointValue(selectedValue);
		updateMarkersPosition(selectedValue);
		// updateMarkersPosition({
		// 	latitude: parseFloat(selectedValue.LATITUDE),
		// 	longitude: parseFloat(selectedValue.LONGITUDE),
		// 	timestamp: Date.now(),
		// });
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
