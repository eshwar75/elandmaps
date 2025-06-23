import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	placeHolder: string;
}
export default function Input({
	value,
	onChange = () => {},
	placeHolder,
}: InputProps) {
	return (
		<>
			<TextInput
				style={styles.input}
				onChangeText={onChange}
				value={value || ''}
				placeholder={placeHolder}
				keyboardType="default"
				placeholderTextColor="#ffffff"
			/>
		</>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		marginVertical: 12,
		borderWidth: 1,
		paddingInline: 20,
		paddingBlock: 30,
		borderRadius: 5,
		width: '100%',
		backgroundColor: '#1a1a1a',
		color: '#ffffff',
	},
});
