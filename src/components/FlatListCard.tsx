import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type VerticalCardProps = {
	onPress: () => void;
	title: string;
	description?: string;
};

export function VerticalCard({
	onPress,
	title,
	description,
}: VerticalCardProps) {
	return (
		<TouchableOpacity
			style={{ height: 100, margin: 8, backgroundColor: '#fff', padding: 16 }}
			onPress={onPress}
		>
			<Text>{title}</Text>
			<Text>{description ? `${description.slice(0, 50)}...` : ''}</Text>
		</TouchableOpacity>
	);
}

export const horizontalCard = ({ title }: any) => (
	<View style={{ width: 100, height: 100, margin: 8, backgroundColor: '#ccc' }}>
		<Text>{title}</Text>
	</View>
);

export const bottomCard = ({ title }: any) => (
	<View style={{ width: 150, height: 150, margin: 8, backgroundColor: '#ccc' }}>
		<Text>{title}</Text>
	</View>
);
