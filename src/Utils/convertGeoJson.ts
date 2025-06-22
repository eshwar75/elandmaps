export const convertGeojsonSinglePoint = (data: any, typeName: string) => {
	return {
		type: 'Feature',
		timestamp: Date.now(),
		geometry: {
			type: typeName,
			coordinates: [parseFloat(data.LATITUDE), parseFloat(data.LONGITUDE)],
		},
		properties: {
			name:
				data.BUILDING && data.BUILDING.toLowerCase() !== 'nil'
					? data.BUILDING
					: data.ADDRESS,
			postal: data.POSTAL || '-',
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
