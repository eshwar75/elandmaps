import { useEffect, useState } from 'react';

export default function useDebounce(value: any, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handlerTimeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handlerTimeout);
		};
	}, [value, delay]);
	return debouncedValue;
}
