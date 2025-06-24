import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import BottomComponent from '../components/BottomComponent';
import { horizontalCard, VerticalCard } from '../components/FlatListCard';

const dummyVerticalCards = Array.from({ length: 9 }, (_, i) => ({
	id: `v-${i}`,
	title: `Card ${i + 1}`,
	description: `This is a detailed description for card ${i + 1}.`.repeat(5),
}));

const dummyHorizontalCards = Array.from({ length: 8 }, (_, i) => ({
	id: i,
	title: `Trending ${i + 1}`,
}));

type VerticalCardType = { id: string; title: string; description: string };

const DetailsScreen = () => {
	const [selectedCard, setSelectedCard] = useState<VerticalCardType | null>(
		null
	);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				horizontal
				data={dummyHorizontalCards}
				renderItem={horizontalCard}
				keyExtractor={item => item.id.toString()}
				style={{ height: 120 }}
			/>
			<FlatList
				data={dummyVerticalCards}
				renderItem={({ item }) => (
					<VerticalCard
						onPress={() => setSelectedCard(item)}
						title={item.title}
						description={item.description}
					/>
				)}
				keyExtractor={item => item.id}
			/>
			{selectedCard && (
				<BottomComponent
					content={dummyHorizontalCards}
					onClose={() => setSelectedCard(null)}
				/>
			)}
		</View>
	);
};

export default DetailsScreen;
