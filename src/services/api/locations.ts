export async function getLocationCoordinates(
	query: string,
	pageNumber?: string
) {
	console.log('Fetching location coordinates for:', query);
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

const isValidCoordinate = (coord: string) =>
	!isNaN(parseFloat(coord)) && isFinite(+coord);

export async function getDrivingRouteCoordinates(
	startLng: string,
	startLat: string,
	endLng: string,
	endLat: string
) {
	const coords = [startLng, startLat, endLng, endLat];
	if (coords.some(coord => !isValidCoordinate(coord))) {
		console.warn('Invalid coordinates');
		return;
	}

	const url = `http://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data?.routes?.[0]?.geometry?.coordinates || [];
	} catch (error) {
		console.log('API getDrivingRouteCoordinates Error:', error);
	}
}
