import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { isValidEmail, isValidPassword } from '../../utilities/validations';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN } from '../../redux/actions/user/login';
import AsyncStorage from '@react-native-community/async-storage';
import { isEmpty } from 'lodash';
export default class SignInBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: '',
			togglePassword: false
		};
	}
	onTogglePassword = () => {
		let { state } = this;
		this.setState({ togglePassword: !state.togglePassword });
	};
	onChangeText = (key, text) => {
		this.setState({ [key]: text });
	};
	async componentDidUpdate(prevProps, prevState) {
		if (this.props.access_token !== prevProps.access_token && this.props.access_token !== null) {
			console.log('in the prevsStte', prevProps, prevState, this.props, this.state);
			await AsyncStorage.setItem('userToken', this.props.access_token);
			this.props.navigation.navigate('AuthLoading');
		}
	}
	changeError = (field) => {
		const { dispatch, err } = this.props;
		let payload = { ...err };
		if (field === 'email') payload['email'] = '';
		else payload['password'] = '';
		dispatch({
			type: LOGIN_FAIL,
			payload
		});
	};
	onCheckValidation = () => {
		console.log('the props are', this.props);
		const { dispatch } = this.props;
		let email = isValidEmail(this.state.email.trim().toLowerCase());
		let payload = {};

		if (!email.valid) {
			payload['email'] = email.message;
		}
		if (this.state.password === '') {
			payload['password'] = 'Password cannot be empty';
		}
		if (!isEmpty(payload)) {
			dispatch({
				type: LOGIN_FAIL,
				payload
			});
			return false;
		}

		return true;
	};
	onSignUp = () => {
		Keyboard.dismiss();
		if (!this.onCheckValidation()) {
			return;
		}
		this.props.onSingUp({ email: this.state.email.trim().toLowerCase(), password: this.state.password });
	};
}
