import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
	View,
	Text,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import Button from '../../components/button';
import style from '../../../style';
import TextInput from '../../components/TextInput';
import Base from './SignUpBase';
import CheckBox from 'react-native-check-box';
import SingleSelectButton from '../../components/SingleSelectButton';
import { register, clearError } from '../../redux/actions/user';
import moment from 'moment';
import Loading from '../loading';
import Header from '../../components/Header';


class SignUp extends Base {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
			// headerStyle: {
			// 	elevation: 0, //remove shadow on Android
			// 	shadowOpacity: 0,
			// 	backgroundColor: '#F5F5F5',
			// 	borderColor: '#C1C0C9',
			// 	borderBottomWidth: 1
			// },
			// headerTitle: () => (
			// 	<Image
			// 		style={{ width: 150, height: 50, flex: 1 }}
			// 		resizeMode="contain"
			// 		source={{ uri: 'icon_without_bg' }}
			// 	/>
			// ),
			// headerRight: () => <View style={{ flex: 1 }} />
		};
	};
	render() {
		let { fullName, DOB, email, password, showDatePicker } = this.state;
		const { error, loading } = this.props;
		return loading ? (
			<Loading />
		) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					style={{ flex: 1, width: '100%' }}
					keyboardShouldPersistTaps="always"
				>
					<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
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
									}}>Welcome To Inzodiac</Text>
									<Text style={{
										marginLeft: '1%',
										color: '#FFFFFF',
										fontSize: 14,
										letterSpacing: 1,
										marginTop: 3,
										fontFamily: 'SFUIDisplay-Regular'
									}}>
										Please create your account
								</Text>
								</View>,
								true,
								this.props
							)
						}
						<View
							style={{
								alignItems: 'flex-start',
								justifyContent: 'center',
								flex: 1
							}}
						>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									width: '100%',
									marginTop: 15
								}}
							>
								<TextInput
									value={fullName}
									secureText={false}
									errorField={error && error.name && error.name}
									TextInputStyle={localStyles.textInputTitle}
									inputContainer={localStyles.inputContainer}
									sub_placeholder={"Fill Name (e.g. John Doe)"}
									customContainerTextInput={localStyles.textInputStyle}
									titleStyle={{ color: '#222124' }}
									placeholder="Full Name"
									onChangeText={(e) => {
										this.onChangeText('fullName', e);
									}}
								/>
								<TextInput
									value={email}
									secureText={false}
									capitalize="none"
									customContainerTextInput={localStyles.textInputStyle}
									sub_placeholder={"john_doe@mail.com"}

									inputContainer={localStyles.inputContainer}
									errorField={error && error.email && error.email}
									TextInputStyle={localStyles.textInputTitle}
									titleStyle={{ color: '#222124' }}
									placeholder="Your Email"
									onChangeText={(e) => {
										this.onChangeText('email', e);
									}}
								/>
								{/* {Platform.OS === 'ios' ? (
									<View style={{ justifyContent: 'flex-start', width: '93%' }}>
										<Text
											style={{
												color: 'black',
												fontFamily: 'SFUIDisplay-Regular',
												marginBottom: 0,
												fontSize: 16,
												marginLeft: 10
											}}
										>
											Birth Date
									</Text>
										<DateTimePicker
											value={DOB ? new Date(DOB) : new Date()}
											mode={'date'}
											style={{ width: '100%' }}
											onChange={(e, date) => {
												this.setState({ DOB: date });
											}}
										/>
									</View>
								) : (
										<TouchableOpacity
											activeOpacity={1}
											onPress={() => this.setState({ showDatePicker: true })}
										>
											<TextInput
												value={DOB ? moment(new Date(DOB)).format('YYYY-MM-DD') : DOB}
												errorField={error && error['DOB']}
												editable={false}
												errorField={false}
												inputContainer={localStyles.inputContainer}
												customContainerTextInput={localStyles.textInputStyle}
												titleStyle={{ color: 'black' }}
												TextInputStyle={localStyles.textInputTitle}
												placeholder="Date Of birth"
												onChangeText={(e) => {
													// this.onChangeText('DOB', e);
												}}
												onPress={() => {
													if (!this.state.showDatePicker) {
														this.setState({ showDatePicker: true });
													}
												}}
												icon2={
													<TouchableOpacity
														onPress={() => {
															if (!this.state.showDatePicker) {
																this.setState({ showDatePicker: true });
															}
														}}
													>
														<Image
															resizeMode="contain"
															style={localStyles.calendar}
															source={{
																uri: 'calendar'
															}}
														/>
													</TouchableOpacity>
												}
											/>
										</TouchableOpacity>
									)} */}

								{/* {showDatePicker ? (
									<DateTimePicker
										value={DOB ? new Date(DOB) : new Date()}
										mode={'date'}
										style={{ width: '100%' }}
										onChange={(e, date) => {
											// console.log("---onChange Date Picker --->>>", date)
											this.setState({ DOB: date, showDatePicker: false }, () => {
												this.changeError('DOB');
											});
										}}
									/>
								) : null}
								{error['DOB'] ? (
									<View style={[style.errorMessageContainerStyle]}>
										<Text style={style.errorMessageTextStyle}>{error['DOB']}</Text>
									</View>
								) : null} */}
								<TextInput
									value={password}
									secureText={!this.state.togglePassword}
									errorField={error && error.password && error.password}
									TextInputStyle={localStyles.textInputTitle}
									inputContainer={localStyles.inputContainer}
									sub_placeholder={"******"}
									customContainerTextInput={localStyles.textInputStyle}
									titleStyle={{ color: '#222124' }}
									placeholder="Password"
									onChangeText={(e) => {
										this.onChangeText('password', e);
									}}
									icon2={
										<TouchableOpacity
											onPress={() => {
												this.setState({ togglePassword: !this.state.togglePassword });
											}}
										>
											<Image
												resizeMode="contain"
												style={localStyles.eye}
												source={{
													uri: 'eye'
												}}
											/>
										</TouchableOpacity>
									}
								/>
								{/* <SingleSelectButton
									options={['male', 'female']}
									selected={this.state.gender}
									onChange={this.onChangeOption}
								/> */}
								{/* {error['gender'] ? (
									<View style={[style.errorMessageContainerStyle]}>
										<Text style={style.errorMessageTextStyle}>{error['gender']}</Text>
									</View>
								) : null} */}
								<View
									style={{
										marginTop: 20,
										flexDirection: 'row',
										width: '93%',
										alignItems: 'center'
									}}
								>
									<CheckBox
										onClick={() => {
											this.onSlectedTandC()
										}}
										checkedCheckBoxColor={primary_color}
										isChecked={this.state.tandc} />
									<Text style={style.font12Regular}>
										{'By creating an account, you accept our terms & condition'}
									</Text>
								</View>
								<Button
									onPress={this.onRegister}
									title="REGISTER"
									style={[
										localStyles.registerButton,
										{ width: '93%', marginTop: 15, marginBottom: 10 }
									]}
								/>
								<Text
									onPress={() => {
										this.props.navigation.goBack();
									}}
									style={[style.font12Regular, { marginBottom: 10 }]}
								>
									{'Already have an account ? Login'}
								</Text>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.user.loading,
		error: state.user.err,
		goToContinueRegisteration: state.user.goToContinueRegisteration
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSignUp: (payload) => {
			dispatch(register(payload));
		},
		clearError: (errorType) => {
			dispatch(clearError(errorType));
		},
		dispatch
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const primary_color = 'rgb(30, 20, 96)';


const localStyles = StyleSheet.create({
	headingText: {
		paddingTop: 10,
		paddingLeft: 10,
		fontSize: 22,
		fontFamily: 'AirbnbCerealApp-Bold'
	},
	eye: {
		height: 12,
		width: 20
	},
	calendar: {
		height: 18,
		width: 30
	},
	textInputStyle: {
		color: 'black',
	},
	inputContainer: {
		backgroundColor: 'rgb(250, 250, 250)',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ddd'
	},
	registerButton: {
		backgroundColor: primary_color,
		color: 'white'
	},
	textInputTitle: {
		color: 'black',
	}
});
