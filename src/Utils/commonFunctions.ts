export function removeDuplicatePointDetails(duplicateDatas: any) {
	let result = [];
	let seen: { [key: string]: boolean } = {};
	for (let duplicateData of duplicateDatas) {
		if (!seen[duplicateData.SEARCHVAL]) {
			seen[duplicateData.SEARCHVAL] = true;
			result.push(duplicateData);
		}
	}
	return result;
}
