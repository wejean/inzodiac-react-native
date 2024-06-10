import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Base from './SettingBase';
import styles from '../../../style';
import ListCard from '../../components/listCard';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/user';
import Loading from '../loading';
import Header from '../../components/Header';

class Settings extends Base {
	// static navigationOptions = ({ navigation }) => {
	// 	return {
	// 		headerStyle: {
	// 			elevation: 0, //remove shadow on Android
	// 			shadowOpacity: 0,
	// 			backgroundColor: '#F5F5F5',
	// 			borderColor: '#C1C0C9',
	// 			borderBottomWidth: 1
	// 		},
	// 		headerTitle: () => (
	// 			<Image
	// 				style={{ width: 120, height: 50, flex: 1 }}
	// 				resizeMode="contain"
	// 				source={{ uri: 'icon_without_bg' }}
	// 			/>
	// 		)
	// 	};
	// };
	static navigationOptions = {
		header: null
	};
	render() {
		let firstOptions = [
			{ title: 'Message Options', iconName: require('../../../assets/idea.png') },
			{ title: 'Permissions & Privacy', iconName: require('../../../assets/lock.png') }
		];
		let secondOption = [
			{ title: 'About', iconName: require('../../../assets/info.png') },
			{ title: 'Rate The App', iconName: require('../../../assets/star.png') },
			{ title: 'Safety', iconName: require('../../../assets/tyre.png') },
			{ title: 'Privacy Policy', iconName: require('../../../assets/shield.png') },
			{ title: 'Code Of Conduct', iconName: require('../../../assets/chat.png') },
			{ title: 'Terms & Conditions', iconName: require('../../../assets/note.png') },
		];

		return this.props.loading ? (
			<Loading />
		) : (
				<ScrollView style={[styles.container, { backgroundColor: '#ffffff' }]}>
					{Header(<View
						style={{ flexDirection: 'column', justifyContent: 'space-between' }}
					>
						<Text style={{
							marginLeft: '1%',
							fontSize: 22,
							fontWeight: 'bold',
							color: '#FFFFFF',
							fontFamily: 'AirbnbCerealApp-Bold'
						}}>Settings</Text></View>, true, this.props)}
					<View style={[styles.container, { backgroundColor: '#f5f6f6' }]}>
						{firstOptions.map((item, key) => {
							return (
								<ListCard
									key={key}
									title={item.title}
									iconName={item.iconName}
									onPressItem={this.onPressItem}
									style={local_styles.listItem}
								/>
							);
						})}
						<ListCard
							style={local_styles.premiumOption}
							title={'InZodiac Premium'}
							iconName={require('../../../assets/crown.png')}
							screenName={'PaymentOption'}
							onPressItem={() => {
								this.onPressItem('PaymentOption');
							}}
						/>
						{secondOption.map((item, key) => {
							return (
								<ListCard
									key={key}
									onPressItem={this.onPressItem}
									title={item.title}
									screenName={item.screenName}
									iconName={item.iconName}
									style={local_styles.listItem}
								/>
							);
						})}
						<TouchableOpacity
							style={local_styles.logoutContainer}
							onPress={() => {
								this.logOut();
								// console.warn('item');
							}}
						>
							<Text style={local_styles.logoutText}>Logout</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		access_token: state.user.access_token,
		loading: state.user.loading
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSignOut: (access_token) => {
			dispatch(signOut({ access_token: access_token }));
		},
		dispatch
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
const local_styles = StyleSheet.create({
	listItem: {
		height: 60
	},
	premiumOption: {
		height: 60,
	},
	logoutContainer: {
		width: '100%',
		height: 60,
		alignItems: 'center',
		backgroundColor: 'white',
		justifyContent: 'center'
	},
	logoutText: {
		color: 'red',
		fontSize: 16,
		fontFamily: 'SFUIDisplay-Regular'
	}
});
