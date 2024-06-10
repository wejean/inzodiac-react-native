import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../../style';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { startCase, LoDashStatic } from 'lodash';
import Base from './base';
import Header from '../../components/Header';
import Button from '../../components/button';


const horoscopes = {
	Aquarius: require('../../../assets/icons_west/Aquarius_white.png'),
	Sagittarius: require('../../../assets/icons_west/Sagittarius_white.png'),
	Pisces: require('../../../assets/icons_west/pisces_white.png'),
	Capricorn: require('../../../assets/icons_west/Capricorn_white.png'),
	Leo: require('../../../assets/icons_west/Leo_white.png'),
	Virgo: require('../../../assets/icons_west/Virgo_white.png'),
	Cancer: require('../../../assets/icons_west/Cancer_white.png'),
	Libra: require('../../../assets/icons_west/Libra_white.png'),
	Scorpio: require('../../../assets/icons_west/Scorpio_white.png'),
	Gemini: require('../../../assets/icons_west/Gemini_white.png'),
	Taurus: require('../../../assets/icons_west/Taurus_white.png'),
	Aries: require('../../../assets/icons_west/Aries_white.png'),
	Rat: require('../../../assets/icons_chinese/rat_white.png'),
	Ox: require('../../../assets/icons_chinese/ox_white.png'),
	Tiger: require('../../../assets/icons_chinese/tiger_white.png'),
	Rabbit: require('../../../assets/icons_chinese/rabbit_white.png'),
	Dragon: require('../../../assets/icons_chinese/dragon_white.png'),
	Snake: require('../../../assets/icons_chinese/snake_white.png'),
	Horse: require('../../../assets/icons_chinese/horse_white.png'),
	Goat: require('../../../assets/icons_chinese/goat_white.png'),
	Monkey: require('../../../assets/icons_chinese/monkey_white.png'),
	Rooster: require('../../../assets/icons_chinese/rooster_white.png'),
	Dog: require('../../../assets/icons_chinese/dog_white.png'),
	Pig: require('../../../assets/icons_chinese/pig_white.png'),
}

class HoroscopeDetail extends Base {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				elevation: 0, //remove shadow on Android
				shadowOpacity: 0,
				backgroundColor: '#F5F5F5',
				borderColor: '#C1C0C9',
				borderBottomWidth: 1
			},
			header: null
		};
	};
	render() {
		return (
			<ScrollView style={{ flex: 1 }}>

				<View style={[styles.container]}>
					<StatusBar backgroundColor={'#17366c'} />
					{Header(<>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => {
									this.changeSelectedOption('chinese');
								}}
							>
								<View style={{ opacity: this.state.selectedOption === 'chinese'? 1: 0.5, paddingBotton: 0, justifyContent: 'center', alignItems: 'center' }}>
									<Text
										style={{
											marginRight: 15,
											color: '#ffffff',
											fontWeight: '500',
											fontFamily: 'AirbnbCerealApp-Bold',
											fontSize: 26
										}}
									>
										Chinese
									</Text>
										<Image resizeMode={'contain'} source={horoscopes[this.props.user[`${'chinese'}_detail`][0].sign]} style={{ width: 50, height: 40, marginLeft: -10}}/>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.changeSelectedOption('western');
								}}
							>
								<View style={{ opacity: this.state.selectedOption === 'western'? 1: 0.5, paddingBotton: 0, justifyContent: 'center', alignItems: 'center' }}>
									<Text
										style={{
											marginLeft: 15,
											color: '#ffffff',
											fontWeight: 'bold',
											fontWeight: '500',
											fontFamily: 'AirbnbCerealApp-Bold',
											fontSize: 26
										}}
									>
										Western
									</Text>
										<Image resizeMode={'contain'} source={horoscopes[this.props.user[`western_detail`][0].sign]} style={{ width: 50, height: 40, marginRight: -10}}/>
										
								</View>
							</TouchableOpacity>
						</View>
					</>
					)}
					<View style={{ padding: 20 }}>
						{this.props.user[`${this.state.selectedOption}_detail`] ? (
							Object.entries(
								this.props.user[`${this.state.selectedOption}_detail`][0]
							).map(([key, value]) => {


								if (key !== 'id') {

									// value = value.replace(',', '');
									// let str = [];
									let str = value.split(',');
									return (
										<>
											{startCase(key) === 'Lucky Number' ?
												<View style={[local_styles.detailTiles, { flexDirection: 'column', alignItems: 'flex-start' }]} key={key}>
													<View style={local_styles.detailTileLeft}>
														<Text style={local_styles.titleStyle}>{startCase(key)}</Text>
													</View>
													<View style={local_styles.detailTileLeft}>

														{str.map(element => {
															return (
																<View style={{ height: 40, width: 40, backgroundColor: primary_color, borderRadius: 20, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontWeight: 'bold' }}>{element}</Text></View>)
														})}
													</View>
												</View>
												:
												startCase(key) === 'Lucky Color' ?
													<View style={[local_styles.detailTiles, { flexDirection: 'column', alignItems: 'flex-start' }]} key={key}>
														<View style={local_styles.detailTileLeft}>
															<Text style={local_styles.titleStyle}>{startCase(key)}</Text>
														</View>
														<View style={local_styles.detailTileLeft}>

															{str.map(element => {
																return (
																	<View style={{ height: 40, width: 40, backgroundColor: element.replace(' ', '').toLowerCase(), borderRadius: 10, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}></View>)
															})}
														</View>
													</View>
													:
													null

											}
										</>
									);
								}
							})
						) : null}
					</View>
				</View>
				<Button
					onPress={() => this.props.navigation.navigate("Horoscope")}
					title="YOUR HOROSCOPE"
					style={[
						local_styles.registerButton,
						{ width: '93%', marginTop: 15, marginBottom: 10, alignSelf: 'center' }
					]}
				/>
			</ScrollView>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user
	};
};

const primary_color = 'rgb(30, 20, 96)';

export default connect(mapStateToProps, null)(HoroscopeDetail);
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
	registerButton: {
		backgroundColor: primary_color,
		color: 'white'
	},
	title: {
		// marginTop: 30,
		// marginLeft: 10,
		marginLeft: '1%',
		fontSize: 22,
		fontWeight: 'bold',
		color: '#FFF',
		fontFamily: 'AirbnbCerealApp-Bold'
	},
	titleText: {
		fontSize: 16,
		fontFamily: 'SFUIDisplay-Semibold'
	},
	paymentOptionCont: {
		minHeight: 90,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		backgroundColor: '#d1d7e2',
		justifyContent: 'space-evenly'
	},
	options: {
		width: '20%',
		minHeight: 60,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionBorder: {
		borderBottomColor: '#17366d',
		borderBottomWidth: 2
	},
	paymentText: {
		fontSize: 16,
		color: '#707070',
		marginBottom: 10,
		fontFamily: 'SFUIDisplay-Regular'
	},
	detailTiles: {
		width: '100%',
		paddingBottom: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	detailTileLeft: {
		flex: 3,
		padding: 5,
		paddingLeft: 0,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	detailTileRight: {
		flex: 1,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	titleStyle: {
		paddingLeft: 7,
		fontSize: 14,
		color: 'grey',

		fontFamily: 'SFUIDisplay-Bold'
	},
	detailText: {
		flex: 1,
		color: '#17366d',
		fontSize: 16,
		marginTop: 10,
		fontFamily: 'SFUIDisplay-Regular'
	}
});
