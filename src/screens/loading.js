import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native';
export default class Loading extends Component {
	static navigationOptions = {
		header: null
	};
	render() {
		return (
			<View style={{ backgroundColor: primary_color, flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
				<StatusBar backgroundColor={primary_color} />
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
					<Image source={require('../../assets/logo.png')} resizeMode="contain" style={{ height: 180, width: 180 }} />
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 40 }}>
					<ActivityIndicator size={'large'} color={'white'} />
					<Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>Loading</Text>
				</View>
			</View>
		);
	}
}

const primary_color = 'rgb(30, 20, 96)';
