import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	onInputFocus?: () => void;
}
export default function Input({
	value,
	onChange = () => {},
	placeholder,
	onInputFocus = () => {},
}: InputProps) {
	return (
		<View style={styles.wrapper}>
			<TextInput
				style={styles.input}
				onChangeText={onChange}
				value={value || ''}
				placeholder={placeholder}
				keyboardType="default"
				placeholderTextColor="#B4B4B8"
				underlineColorAndroid="transparent"
				onFocus={onInputFocus}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#FFFFFF',
		// borderColor: '#000957',
		justifyContent: 'center',
		height: 48,
		borderRadius: 8,
		paddingHorizontal: 12,
		marginVertical: 10,
	},
	input: {
		flex: 1,
		color: '#27374D',
		height: '100%',
		fontSize: 16,
	},
});
