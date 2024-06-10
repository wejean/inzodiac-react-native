import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Base from './QuestionsBase';
import Button from '../../components/button';
import style from '../../../style';
export default class Questions extends Base {
	static navigationOptions = {
		header: null
	};
	getChain = () => {
		let item = [];
		for (let i = 0; i < 10; i++) {
			item = item.concat(
				<React.Fragment>
					<View
						style={{
							height: 20,
							width: 20,
							borderRadius: 10,
							backgroundColor: '#c1c0c9'
						}}
					/>
					<View
						style={{
							height: 3,
							width: 10,
							backgroundColor: '#c1c0c9'
						}}
					/>
				</React.Fragment>
			);
		}
		return item;
	};
	render() {
		let options = ['option1', 'option1', 'option1', 'option1', 'option1', 'option1'];
		return (
			// <ScrollView style={{ flex: 1 }}>
			<View style={local_styles.container}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					{this.getChain()}
				</View>
				<Text style={local_styles.questionsText}>
					{'Given the choice of anyone in the world, whome would you want as a dinner guest'}
				</Text>
				<View style={local_styles.optionContainer}>
					{options.map((item) => {
						return (
							<TouchableOpacity style={local_styles.options}>
								<Text style={style.font12Regular}>{item}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<Button
					title={'Continue'}
					style={local_styles.continueButton}
					onPress={() => {
						this.props.navigation.navigate('Questions');
					}}
				/>
				{/* </ScrollView> */}
			</View>
		);
	}
}
const local_styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center'
	},
	questionsText: {
		fontSize: 16,
		fontFamily: 'AirbnbCerealApp-Bold',
		padding: 30
	},
	continueButton: {
		backgroundColor: 'black',
		color: 'white',
		marginBottom: 20,
		alignSelf: 'center'
	},
	optionContainer: {
		flexDirection: 'row',
		flex: 1,
		padding: 20,
		marginTop: 40,
		width: '100%',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	options: {
		width: '45%',
		height: 40,
		padding: 30,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2f2f2'
	}
});
