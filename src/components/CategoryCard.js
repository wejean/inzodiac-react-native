import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const CategoryCard = ({ iconName = '', title = '', description = '', onPress = () => { } }) => (
	<TouchableOpacity
		style={{
			width: '47%',
			height: '31%',
			backgroundColor: 'white',
			marginTop: '2%',
			marginLeft: '2%',
			borderRadius: 10,
			justifyContent: 'space-evenly',
			alignItems: 'center',
			borderColor: '#efefef',
			borderWidth: 1
		}}
		onPress={onPress}
	>
		{iconName ? <Image source={{ uri: iconName }} resizeMode="contain" style={{ height: "40%", width: 60 }} /> : null}
		<View style={{ width: '60%' }}>
			{title ? (
				<Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'AirbnbCerealApp-Bold' }}>{title}</Text>
			) : null}
			{description ? (
				<Text
					style={{ color: 'gray', fontSize: 12, textAlign: 'center', fontFamily: 'AirbnbCerealApp-Medium' }}
				>{`(${description})`}</Text>
			) : null}
		</View>
	</TouchableOpacity>
);

export default CategoryCard;
