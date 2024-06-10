import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/button';

export default class RegisterContinue extends Component {
	static navigationOptions = {
		header: null
	};
	render() {
		return (
			<ImageBackground
				resizeMode="cover"
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				source={{
					uri: 'banner_blur'
				}}
			>
				<View
					style={{
						flex: 1,
						alignSelf: 'center',
						marginTop: 50,
						justifyContent: 'flex-start',
						textAlign: 'justify'
					}}
				>
					<Image
						resizeMode="contain"
						style={{ height: 70, width: 200, alignSelf: 'center' }}
						source={{ uri: 'inzodiac' }}
					/>
					<View style={{ marginTop: 20, width: '60%', alignSelf: 'center', textAlign: 'center' }}>
						<Text style={Local_styles.text}>
							{
								"Let's get started, We'll ask you couple of questions to get to know you. It will take maximum 4 minutes"
							}
						</Text>
					</View>
				</View>
				<Button
					title={'Continue'}
					style={Local_styles.continueButton}
					onPress={() => {
						this.props.navigation.navigate('Questions');
					}}
				/>
			</ImageBackground>
		);
	}
}
const Local_styles = StyleSheet.create({
	continueButton: {
		backgroundColor: 'black',
		color: 'white',
		marginBottom: 20
	},
	text: { color: 'white', fontSize: 18, fontFamily: 'AirbnbCerealApp-Bold' }
});
