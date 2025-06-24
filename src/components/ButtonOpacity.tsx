import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function ButtonOpacity({
	onPress,
	title,
	isDisabed = false,
	backgroundColor = '#000957',
	width = '50%',
	color = '#FFFFFF',
}: {
	onPress: () => void;
	title: string;
	isDisabed?: boolean;
	backgroundColor?: string;
	width?: import('react-native').DimensionValue;
	color?: string;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.buttonContainer,
				{
					opacity: isDisabed ? 0.55 : 1,
					backgroundColor: backgroundColor,
					width,
				},
			]}
			disabled={isDisabed}
		>
			<Text style={[styles.buttonText, { color }]}>{title}</Text>
		</TouchableOpacity>
	);
}

export function CardButtonOpacity({
	onPress,
	title,
	subTitle,
}: {
	onPress: () => void;
	title: string;
	subTitle: string;
}) {
	return (
		<TouchableOpacity style={{ padding: 16, width: '100%' }} onPress={onPress}>
			{title && <Text style={styles.listTitle}>{title}</Text>}
			<Text style={styles.listSubTitle}>{subTitle || '-'}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	mapContainer: { flex: 1 },
	buttonContainer: {
		borderRadius: 5,
		padding: 3,
		margin: 10,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 800,
		padding: 10,
	},
	listTitle: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: 600,
	},
	listSubTitle: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: 500,
	},
});
