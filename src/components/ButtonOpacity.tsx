import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ButtonOpacity({
	onPress,
	title,
}: {
	onPress: () => void;
	title: string;
}) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
			<View style={styles.cardTextContainer}>
				<Text style={styles.buttonText}>{title}</Text>
			</View>
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
		<TouchableOpacity style={{ padding: 16 }} onPress={onPress}>
			{title && <Text style={styles.listTitle}>{title}</Text>}
			<Text style={styles.listSubTitle}>{subTitle || '-'}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	mapContainer: { flex: 1 },
	cardTextContainer: {
		padding: 10,
		borderRadius: 5,
		elevation: 3,
	},
	buttonContainer: {
		backgroundColor: 'blue',
		borderRadius: 5,
		margin: 10,
		width: '50%',
	},
	buttonText: { color: 'white', textAlign: 'center', fontWeight: 600 },
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
