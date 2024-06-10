import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../style';
import Button from '../../components/button';
import Header from '../../components/Header';
import Base from './index';

const List = [
	{
		months: 5,
		price: 6.99,
		index: 0
	},
	{
		months: 15,
		price: 17.99,
		index: 1
	},
	{
		months: 30,
		price: 29.99,
		index: 2
	}

]

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
								Activating premium will help you meet more people, faster!
							</Text>
						</View>,
						true,
						this.props
					)
				}
				<View style={[local_styles.header, styles.container]}>

					<View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', marginVertical: 10 }}>
						{List.map(({ price, months, index }) => {
							return (
								<TouchableOpacity onPress={() => this.setState({ selected: index })} style={{ height: 110, justifyContent: 'space-between', alignItems: 'center', width: 110, borderRadius: 55, justifyContent: 'center', backgroundColor: '#FFF', elevation: 5 }}>
									<Text style={{fontWeight: 'bold' }}>
										{months}
									</Text>
									<Text>
										Tokens
									</Text>
									<View style={{ height: 55, width: 110, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 55, borderBottomRightRadius: 55, backgroundColor: this.state.selected === index ? primary_color : 'lightgray' }}>
										<Text style={{ color: '#FFF', fontWeight: 'bold' }}>
											${price}
										</Text>
									</View>
								</TouchableOpacity>
							)
						}
						)}

					</View>

					<View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center', borderRadius: 5, elevation: 5, backgroundColor: '#FFF', marginVertical: 10 }}>
						<View style={{ padding: 10, width: "30%", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: primary_color }}>
							<View style={{ width: "100%", height: 50, borderRadius: 25, backgroundColor: primary_color, justifyContent: 'center', alignItems: 'center' }}>
								<Image
									source={require('../../../assets/icon.png')}
									style={{ height: 40, width: 40 }}
									resizeMode="contain"
								/>
							</View>
						</View>
						<View style={{ padding: 10, width: "70%", borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: '#FFF' }}>
							<Text style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>Reward X2 TOKEN</Text>
							<Text style={{ fontSize: 14, alignSelf: 'center', textAlign: 'center' }}>Just watch 4 videos per day</Text>
						</View>
					</View>

					<View>
						<Text style={{
							width: '90%',
							alignSelf: 'center',
							fontSize: 22,
							marginVertical: 10,
							fontWeight: 'bold',
							fontFamily: 'AirbnbCerealApp-Bold'
						}}>
							Token Rewards
						</Text>
						<Text style={{
							width: '90%',
							alignSelf: 'center',
							fontSize: 14,
							marginTop: 3,
							fontFamily: 'SFUIDisplay-Regular'
						}}>
							Invite a friend, Reward = x2 tokens per registered friend {'\n\n'}
							Share us on Facebook or Instagram, Reward = x2 Tokens{'\n\n'}
							Watch x4 30 second ads per day, Reward = x2 Tokens{'\n\n'}
							36Q&A game, Cost = X2 tokens{'\n\n'}
							Boost your profile, Cost = X2 tokens{'\n\n'}
							Monthly Horoscope, Cost = x2 Tokens{'\n\n'}
							X3 additional profile images, Cost = x5 Tokens{'\n\n'}
							Ad free for one month, Cost = x8 Tokens{'\n\n'}
						</Text>
					</View>


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

const primary_color = 'rgb(30, 20, 96)';

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
