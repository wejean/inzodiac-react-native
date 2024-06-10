import React from 'react';
import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../style';
import Header from '../../components/Header';
import Base from './base';


class Horoscope extends Base {
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

	toggleModal() {
		this.setState({isModalVisible: false})
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.isModalVisible}
					onRequestClose={this.toggleModal}
				>

					<TouchableOpacity onPress={()=>{this.setState({isModalVisible: false})}}  style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>
						<View style={{ backgroundColor: '#FFF', alignSelf: 'center', width: '90%', padding: '5%', borderRadius: 10, justifyContent: 'space-between' }}>
							<Text style={{ width: "100%", marginVertical: 5, textAlign: 'center', fontFamily: 'SFUIDisplay-Semibold' }}>You can upgrade to weekly horoscope choosing one of the ways:</Text>
							<View style={{flexDirection: 'row', marginVertical: 10, width: '100%', justifyContent: 'space-between'}}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate("Token")
								}}
								style={local_styles.options}
							>
								<View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: primary_color, justifyContent: 'center', alignItems: 'center' }}>
									<Image
										source={require('../../../assets/icon-1.png')}
										style={{ height: 40, width: 40 }}
										resizeMode="contain"
									/>
								</View>
								<Text style={local_styles.paymentText}>Credit Card</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate("Token")
								}}
								style={local_styles.options}
							>
								<View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: primary_color, justifyContent: 'center', alignItems: 'center' }}>
									<Image
										source={require('../../../assets/icon.png')}
										style={{ height: 40, width: 40 }}
										resizeMode="contain"
									/>
								</View>
								<Text style={local_styles.paymentText}>Buy Tokens</Text>
							</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				</Modal>

				<View style={[styles.container]}>
					<StatusBar backgroundColor={'#17366c'} />
					{Header(<>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{
								marginLeft: '1%',
								fontSize: 22,
								fontWeight: 'bold',
								color: '#FFFFFF',
								fontFamily: 'AirbnbCerealApp-Bold'
							}}>The Game</Text>
						</View>
					</>, true, this.props
					)}

				</View>
				<View style={{alignSelf: 'center', height: 50, width: 50, justifyContent: 'center', borderRadius: 25, backgroundColor: primary_color}}>
					<Text style={{color: '#FFF', alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>3</Text>
				</View>
				<Text style={{ width: '90%', alignSelf: 'center', marginVertical: 25, }}>Given the choice of anyone in the world, whom would you want as a dinner guest?</Text>
				
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

export default connect(mapStateToProps, null)(Horoscope);
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
	options: {
		width: '45%',
		minHeight: 150,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#efefef',
		borderRadius: 10,
	},
	optionBorder: {
		borderBottomColor: '#17366d',
		borderBottomWidth: 2
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
	// options: {
	// 	width: '20%',
	// 	minHeight: 60,
	// 	textAlign: 'center',
	// 	justifyContent: 'center',
	// 	alignItems: 'center'
	// },
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
