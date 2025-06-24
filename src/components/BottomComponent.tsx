import React, { useRef, useState } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { bottomCard } from './FlatListCard';

type BottomComponentProps = {
	content: Array<{ id: number; title: string }>;
	onClose: () => void;
};

const BottomComponent = ({ content, onClose }: BottomComponentProps) => {
	const bottomSheetRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);
	const screenHeight = Dimensions.get('window').height;
	const snapPoints = [
		Math.min(contentHeight, screenHeight * 0.8),
		screenHeight,
	];

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			onChange={(index: any) => index === 0 && onClose()}
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: '#fff' }}
		>
			<View
				onLayout={event => {
					const { height } = event.nativeEvent.layout;
					setContentHeight(height);
				}}
				style={{ padding: 16 }}
			>
				<FlatList
					horizontal
					data={content}
					renderItem={bottomCard}
					keyExtractor={item => item.id.toString()}
					showsHorizontalScrollIndicator={true}
				/>
			</View>
		</BottomSheet>
	);
};

export default BottomComponent;
