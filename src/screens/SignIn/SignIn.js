import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	StyleSheet,
	Image,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import Button from '../../components/button';
import style from '../../../style';
import TextInput from '../../components/TextInput';
import SignInBase from './SignInBase';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/user';
import Loading from '../loading';
import Header from '../../components/Header';

class SignIn extends SignInBase {
	static navigationOptions = {
		header: null
	};
	render() {
		let { email, password } = this.state;
		let { err, loading } = this.props;
		let { email: emailErr = '', password: passwordErr = '' } = err;
		return loading ? (
			<Loading />
		) : (
				<View
					resizeMode="cover"
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>

					<StatusBar backgroundColor={'#17366D'} barStyle="dark-content" />
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : null}
						style={{ flex: 1, width: '100%' }}
						keyboardShouldPersistTaps="always"
					>
						<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
							{Header(
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
										Please login to your account
								</Text>
								</View>
							)}

							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: '5%'
								}}
							>
								<TextInput
									value={email}
									secureText={false}
									errorField={emailErr}
									titleStyle={{ color: '#222124' }}
									inputContainer={Local_styles.inputContainer}
									capitalize="none"
									TextInputStyle={Local_styles.textInputStyle}
									sub_placeholder={"john_doe@mail.com"}
									customContainerTextInput={Local_styles.textInputStyle}
									placeholder="Email Address / Username"
									onChangeText={(e) => {
										if (emailErr) {
											this.changeError('email');
										}
										this.onChangeText('email', e);
									}}
									customContainerTextInput={{
										borderBottomColor: 'white'
									}}
								/>
								<TextInput
									value={password}
									secureText={!this.state.togglePassword}
									inputContainer={Local_styles.inputContainer}
									titleStyle={{ color: '#222124' }}
									errorField={passwordErr}
									sub_placeholder={"*****"}
									placeholder="Password"
									TextInputStyle={Local_styles.textInputStyle}
									customContainerTextInput={Local_styles.textInputStyle}
									onChangeText={(e) => {
										if (passwordErr) {
											this.changeError('password');
										}
										this.onChangeText('password', e);
									}}
									customContainerTextInput={{
										borderBottomColor: 'white'
									}}
									rightTitle={'Forgot?'}
									onClickRightTitle={() => {
										console.warn('forgot is clicked');
									}}
									icon2={
										<TouchableOpacity onPress={this.onTogglePassword}>
											<Image
												resizeMode="contain"
												style={Local_styles.eye}
												source={{
													uri: 'eye_white'
												}}
											/>
										</TouchableOpacity>
									}
								/>
								<Button
									title={'LOGIN'}
									style={Local_styles.loginButton}
									onPress={this.onSignUp}
								/>
								<Button
									icon="facebook"
									onPress={this.onFacebookSignin}
									title="Continue With Facebook"
									style={[style.fbButtonColor, { width: '93%', marginTop: 15, marginBottom: 10 }]}
								/>
								<Text style={[style.simpleText, { marginTop: 15, marginBottom: 5 }]}>
									"Don't Have an account?"
							</Text>
								<Text
									onPress={() => {
										this.props.navigation.navigate('SignUp');
									}}
									style={{fontSize: 12,
										fontFamily: 'SFUIDisplay-Bold',}}
								>
									{'Create new Account'.toUpperCase()}
								</Text>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.user.loading,
		email: state.user.email,
		password: state.user.password,
		err: state.user.err,
		access_token: state.user.access_token
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSingUp: ({ email, password }) => {
			dispatch(login({ email: email, password: password }));
		},
		dispatch
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const primary_color = 'rgb(30, 20, 96)';

const Local_styles = StyleSheet.create({
	container: { flex: 1 },
	loginButton: {
		backgroundColor: primary_color,//'#e6e7e9',
		alignSelf: 'center',
		color: 'white',
		width: '93%',
	},
	eye: {
		height: 12,
		width: 20
	},
	inputContainer: {
		backgroundColor: 'rgb(250, 250, 250)',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ddd'
	},
	textInputStyle: {
		color: 'black'
	},
});
