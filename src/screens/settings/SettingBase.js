import React, { Component } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SettingBase extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.access_token !== prevProps.access_token && this.props.access_token == null) {
			AsyncStorage.removeItem('userToken');
			this.props.navigation.navigate('AuthLoading');
		}
	};
	onPressItem = (item) => {
		item && this.props.navigation.navigate(item);
	};
	logOut = () => {
		Alert.alert('', 'Are You sure you want me log out?', [
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
}
