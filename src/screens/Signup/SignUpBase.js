import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import moment from 'moment';
import { isValidEmail, isValidPassword } from '../../utilities/validations';
import { REGISTER_FAIL, REGISTER_SUCCESS, REGISTER } from '../../redux/actions/user/register';
import { isEmpty } from 'lodash';

const errorTypeMap = {
	fullName: 'name',
	email: 'email',
	DOB: 'birthday',
	password: 'password'
};

export default class SignUpBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			email: '',
			// DOB: '',
			password: '',
			// gender: '',
			tandc: false,
			showDatePicker: false,
			togglePassword: false
		};
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.goToContinueRegisteration && this.props.goToContinueRegisteration) {
			this.props.navigation.navigate('ContinueRegisteration');
		}
	}

	onRegister = () => {
		Keyboard.dismiss();
		if (!this.onCheckValidation()) {
			return;
		}
		const { email, fullName: name, DOB, gender, password } = this.state;
		this.props.onSignUp({
			email: email.trim().toLowerCase(),
			name,
			// birthday: moment(new Date(DOB)).format('YYYY-MM-DD'),
			// gender: gender && gender === 'male' ? 1 : 0,
			password
		});
	};
	changeError = (field) => {
		const { dispatch, err } = this.props;
		let payload = { ...err };
		payload[field] = '';
		// if (field === 'email') payload['email'] = '';
		// else payload['password'] = '';
		// else payload
		dispatch({
			type: REGISTER_FAIL,
			payload: { error: payload }
		});
	};
	onCheckValidation = () => {
		const { dispatch } = this.props;
		let email = isValidEmail(this.state.email.trim().toLowerCase());
		let payload = {};
		if (!email.valid) {
			payload['email'] = email.message;
		}
		if (this.state.password === '') {
			payload['password'] = 'Password cannot be empty';
		}
		if (this.state.fullName === '') {
			payload['name'] = 'Full Name cannot be empty';
		}
		// if (!this.state.DOB) {
		// 	payload['DOB'] = 'D.O.B cannot be empty';
		// }
		// if (this.state.gender === '') {
		// 	payload['gender'] = 'Gender cannot be empty';
		// }
		if (!isEmpty(payload)) {
			console.log('in the dispatch');
			dispatch({
				type: REGISTER_FAIL,
				payload: { error: payload }
			});
			return false;
		}

		return true;
	};
	onChangeText = (name, value) => {
		const { error, clearError } = this.props;
		const errorType = errorTypeMap[name];
		if (error && errorType && error[errorType]) {
			clearError(errorType);
		}

		this.setState({ [name]: value });
	};
	onChangeOption = (option) => {
		this.changeError('gender');
		this.setState({ gender: option });
	};
	onSlectedTandC = () => {
		this.setState({ tandc: !this.state.tandc });
	};
}
