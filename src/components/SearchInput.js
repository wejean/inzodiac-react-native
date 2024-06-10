import React, { Fragment, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const gray = 'rgb(220,220,220)';
const SearchInput = ({ value, maxLength = 100, onChangeText, defaultValue }) => {
	const [isFocused, toggleFocus] = useState(false);
	return (
		<View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, color: gray, marginTop: 10 }}>
			<TextInput
				value={value}
				maxLength={maxLength}
				onChangeText={onChangeText}
				defaultValue={defaultValue}
				style={{
					color: 'black',
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 10,
					fontSize: 14,
					fontFamily: 'SFUIDisplay-Regular'
				}}
				onFocus={() => {
					toggleFocus(true);
				}}
				onBlur={() => {
					!value && toggleFocus(false);
				}}
			/>
			{!isFocused ? (
				<View
					style={{
						position: 'absolute',
						flex: 1,
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
						zIndex: -1
					}}
				>
					<Icon name="search1" size={15} style={{ marginLeft: 20, marginRight: 20 }} />
					<Text style={{ color: 'gray', fontFamily: 'SFUIDisplay-Regular', fontSize: 14 }}>Search</Text>
				</View>
			) : (
					false
				)}
		</View>
	);
};

export default SearchInput;
