import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../../style';

class SettingOptions extends React.Component {
	static navigationOptions = {
		header: (
			<View style={styles.customHeader}>
				<Text style={styles.headerFont}>Settings</Text>
			</View>
		)
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.access_token !== prevProps.access_token && this.props.access_token == null) {
			AsyncStorage.removeItem('userToken');
			this.props.navigation.navigate('AuthLoading');
		}
	};
	onChooseOption = (item) => {
		this.props.navigation.navigate(item);
	};
	onLogOut = () => {
		Alert.alert('Alert Title', 'Are You sure you want me log out ??', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: () => {
					AsyncStorage.removeItem('userToken', () => {
						this.props.navigation.navigate('AuthLoading');
					});
					this.props.onSignOut(this.props.access_token);
				}
			}
		]);
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={local_styles.logoutContainer}
					onPress={() => {
						this.onChooseOption('Settings');
					}}
				>
					<Text style={[ local_styles.logoutText, { color: 'black' } ]}>Payment Options</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={local_styles.logoutContainer}
					onPress={() => {
						this.onChooseOption('HoroscopeDetail');
					}}
				>
					<Text style={[ local_styles.logoutText, { color: 'black' } ]}>HoroScope Details</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={local_styles.logoutContainer}
					onPress={() => {
						this.onLogOut();
						// console.warn('item');
					}}
				>
					<Text style={local_styles.logoutText}>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const local_styles = StyleSheet.create({
	logoutContainer: {
		marginBottom: 20,
		width: '100%',
		borderBottomWidth: 0.75,
		borderTopColor: '#C1C0C9',
		borderTopWidth: 0.75,
		borderBottomColor: '#C1C0C9',
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingOptions);
