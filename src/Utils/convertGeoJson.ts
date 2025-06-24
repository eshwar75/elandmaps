import { normalizedKeys } from './commonFunctions';

export const convertGeojsonSinglePoint = (data: any, typeName: string) => {
	const normalizedkeyAndValues = normalizedKeys(data);
	return {
		type: 'Feature',
		timestamp: Date.now(),
		geometry: {
			type: typeName,
			coordinates: [
				parseFloat(String(normalizedkeyAndValues?.latitude)),
				parseFloat(String(normalizedkeyAndValues?.longitude)),
			],
		},
		properties: {
			name:
				typeof normalizedkeyAndValues.building === 'string' &&
				normalizedkeyAndValues.building.toLowerCase() !== 'nil'
					? data.building
					: data.address,
			postal: data.postal || '-',
		},
	};
};

export const convertGeojsonPolyLines = (
	objectData: any,
	typeName: string,
	name: string
) => {
	return {
		type: 'Feature',
		timestamp: new Date().toISOString(),
		geometry: { type: typeName, coordinates: objectData },
		properties: { name: name },
	};
};
