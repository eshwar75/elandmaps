import React, { createContext, useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
// import { addEventListener } from '@react-native-community/netinfo';
import { Platform } from 'react-native';

// Define proper types
interface NetworkContextType {
	isConnected: boolean | null;
}

export const NetworkContext = createContext<NetworkContextType>({
	isConnected: null,
});

export const NetworkProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState<boolean | null>(null);
	console.log(isConnected);

	useEffect(() => {
		if (Platform.OS === 'android') {
			const unsubscribe = NetInfo.addEventListener(state => {
				setIsConnected(state.isConnected || false);
			});
			return () => {
				unsubscribe();
			};
		}
	}, []);

	return (
		<NetworkContext.Provider value={{ isConnected }}>
			{children}
		</NetworkContext.Provider>
	);
};

// Uncomment this custom hook
export const useNetwork = () => useContext(NetworkContext);
