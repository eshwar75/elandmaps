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
	data: any,
	typeName: string,
	name: string
) => {
	return objectData = data.map((value: number[]) => ({
		latitude: value[0],
		longitude: value[1],
	}));

	// return {
	// 	type: 'Feature',
	// 	timestamp: Date.now(),
	// 	geometry: { type: typeName, coordinates: objectData },
	// 	properties: { name: name },
	// };
};

// const convertGeojsonPoint = (data: any, name) => {
// 	const objectData = data.map(value => ({
// 		latitude: value[0],
// 		longitude: value[1],
// 	}));
// 	console.log(objectData);

// 	return {
// 		type: 'Feature',
// 		timestamp: Date.now(),
// 		geometry: {
// 			type: 'Point',
// 			coordinates: objectData,
// 		},
// 		properties: { name: name },
// 	};
// };
