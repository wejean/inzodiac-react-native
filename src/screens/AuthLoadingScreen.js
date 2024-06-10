import React from 'react';
import { ActivityIndicator, Button, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './loading';
import { connect } from 'react-redux';
import { LOGIN_SUCCESS, getMe } from '../redux/actions/user';
import { getFavourites } from '../redux/actions/favourite';

class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		if (userToken) {
			this.props.dispatch({ type: LOGIN_SUCCESS, payload: { access_token: userToken } });
			this.props.getMe({ access_token: userToken });
			this.props.getFavourites({ access_token: userToken, name: '' });
		}
		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Login');
	};

	// Render any loading content that you like here
	render() {
		return <Loading />;
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getMe: ({ access_token }) => {
			dispatch(getMe({ access_token }));
		},
		getFavourites: ({ access_token, name }) => {
			dispatch(getFavourites({ access_token, name }));
		},
		dispatch
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
