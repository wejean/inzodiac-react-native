import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import Base from './PaymentOptionBase';
import Button from '../../components/button';
import RadioButtonCard from '../../components/radioButtonCard';
import Header from '../../components/Header';

export default class PaymentOption extends Base {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		};
	};
	render() {
		let { paymentOption } = this.state;
		return (
			<ScrollView style={{ flex: 1 }}>
				{
					Header(
						<View
							style={{ flexDirection: 'column', justifyContent: 'space-between' }}
						>
							<Text style={{
								marginLeft: '1%',
								fontSize: 22,
								fontWeight: 'bold',
								color: '#FFFFFF',
								fontFamily: 'AirbnbCerealApp-Bold'
							}}>Upgrade To Premium</Text>
							<Text style={{
								marginLeft: '1%',
								color: '#FFFFFF',
								fontSize: 14,
								marginTop: 3,
								fontFamily: 'SFUIDisplay-Bold'
							}}>
								Activating premium will help you meet more people, faster!						</Text>
						</View>,
						true,
						this.props
						)
				}
				<View style={[local_styles.header, styles.container]}>

					
					<View style={local_styles.paymentOptionCont}>
						<TouchableOpacity
							onPress={() => {
								this.chanePaymentOption('Credit Card');
							}}
							style={local_styles.options}
						>
							<Image
								source={require('../../../assets/card.png')}
								style={{ height: 40, width: 40 }}
								resizeMode="contain"
							/>
							<Text style={local_styles.paymentText}>Credit Card</Text>
						
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.chanePaymentOption('PayPal');
							}}
							style={local_styles.options}
						>
							<Image
								source={require('../../../assets/paypal.png')}
								style={{ height: 40, width: 40 }}
								resizeMode="contain"
							/>
							<Text style={local_styles.paymentText}>PayPal</Text>
						</TouchableOpacity>
					</View>

					{this.state.paymentOption === 'Credit Card' ? (
						<RadioButtonCard
							selectedOption={this.state.selectedOption}
							onChoosePlan={this.onChoosePlan}
							radio_props={[
								{
									label: '3 months',
									value: true,
									amount: 1.86,
									popular: true,
									payment: 23.99,
									selected: true
								},
								{ label: '1 week', value: false, amount: 4.33, payment: 4.99, selected: false },
								{ label: '1 month', value: false, amount: 2.33, payment: 9.99, selected: false },
								{ label: '12 months', value: false, amount: 1.15, payment: 20.99, selected: false }
							]}
						/>
					) : null}

					<Button
						onPress={this.onContinue}
						title="Continue"
						style={[
							local_styles.registerButton,
							{ width: '90%', marginTop: 15, marginBottom: 10, alignSelf: 'center' }
						]}
					/>
				</View>
			</ScrollView>
		);
	}
}
const local_styles = StyleSheet.create({
	topView: {
		height: 100,
		color: 'black',
		padding: 20,
		textAlign: 'justify',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#d1d7e2'
	},
	subtitleText: {
		fontSize: 14,
		color: 'gray',
		fontFamily: 'SFUIDisplay-Light'
	},
	titleText: {
		fontSize: 16,
		fontFamily: 'SFUIDisplay-Semibold'
	},
	registerButton: {
		backgroundColor: 'rgb(30, 20, 96)',
		color: 'white',
		borderRadius: 10
	},
	paymentOptionCont: {
		minHeight: 100,
		marginVertical: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-evenly'
	},
	options: {
		width: '42.5%',
		minHeight: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#efefef',
		borderRadius: 10,
	},
	optionBorder: {
		borderBottomColor: '#17366d',
		borderBottomWidth: 2
	},
	paymentText: {
		fontSize: 14,
		color: '#707070',
		marginBottom: 10,
		fontFamily: 'SFUIDisplay-Regular'
	}
});
