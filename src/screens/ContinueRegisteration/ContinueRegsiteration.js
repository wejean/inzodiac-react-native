import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import style from '../../../style';
import Button from '../../components/button';
import Header from '../../components/Header';
import SingleSelectButton from '../../components/SingleSelectButton';
import TextInput from '../../components/TextInput';
import { addAvatar, continueRegisteration_insertProfile, insertProfile, updateProfile } from '../../redux/actions/user';
import Loading from '../loading';
import Base from './ContinueRegisterationBase';


class ContinueRegisteration extends Base {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		};
	};
	render() {
		let fields = [
			{
				title: 'Gender',
				options: ['male', 'female'],
				stateName: 'gender'
			},
		];
		const { DOB, showDatePicker } = this.state;
		const { error } = this.props;

		if (this.props.aboutMe) {
			return this.props.loading ? (
				<Loading />
			) : (
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : null}
						style={{ flex: 1 }}
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
									}}>Last Step To Complete</Text>
									<Text style={{
										marginLeft: '1%',
										color: '#FFFFFF',
										fontSize: 14,
										marginTop: 3,
										fontFamily: 'SFUIDisplay-Bold'
									}}>
										The more you tell about yourself, more people would be able to notice you</Text>
								</View>,
								true,
								this.props
							)}
							{/* <Text style={styles.heading Text}>{'Set Up Profile'}</Text> */}
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'space-evenly',
									flex: 1,
									padding: 0,
									flexDirection: 'column'
								}}
							>
								<TextInput
									multiline
									value={`${this.state.about || ''}`}
									errorField={false}
									titleStyle={{ color: '#222124' }}
									TextInputStyle={localStyles.textInputTitle}
									inputContainer={[localStyles.inputContainer, {height: 200}]}
									customContainerTextInput={localStyles.textInputStyle}
									placeholder="About you"
									onChangeText={(e) => {
										this.onChangeText('about', e);
									}}
								/>

								<Button
									onPress={this.onContinue}
									title="Done"
									style={[localStyles.registerButton, { width: '93%', marginTop: 15, marginBottom: 10 }]}
								/>
								<View style={{flexDirection: 'row'}}>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray'}}>

									</View>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray'}}>
										
									</View>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: primary_color}}>
										
									</View>
								</View>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				);
		}

		return this.props.loading ? (
			<Loading />
		) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					style={{ flex: 1, width: '100%' }}
					keyboardShouldPersistTaps="always"
				>
					<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">


						<View
							style={{ flexDirection: 'column', justifyContent: 'space-between' }}
						>
							<TouchableOpacity
								onPress={this.onAddImage}
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{this.props.userProfileData.avatar ? (
									<ImageBackground
										resizeMode="cover"
										style={{ width: '100%', height: 300, paddingVertical: 20, justifyContent: 'space-between', backgroundColor: 'rgba(100, 100, 100, 0.5)' }}
										source={{ uri: this.props.userProfileData.avatar }}
									>
										<View style={{ width: '100%', padding: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
											<Icon
												name="left"
												color={'white'}
												size={20}
												onPress={() => {
													this.props.navigation.goBack();
												}}
											/>
											<Text style={{ color: '#FFF' }}>
												SKIP
												</Text>
										</View>
										<View>
											<View style={{ width: '100%', padding: 20, flexDirection: 'row', alignItems: 'center' }}>
												<View style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 15, backgroundColor: primary_color }}>
													<Icon
														name="plus"
														color={'#FFF'}
														size={16}
													/>
												</View>
												<Text style={{
													marginLeft: '1%',
													fontSize: 14,
													letterSpacing: 1,
													marginTop: 3,
													fontFamily: 'SFUIDisplay-Bold',
													color: '#FFF', marginLeft: 10
												}}>
													Please upload the photos of your profile
												</Text>
											</View>
										</View>


									</ImageBackground>

								) : (
										<ImageBackground
											resizeMode="cover"
											style={{ opacity: 0.8, width: '100%', height: 300, paddingVertical: 20, justifyContent: 'space-between', backgroundColor: '#000000' }}
											source={require('../../../assets/user.png')}
										>
											<View style={{ width: '100%', padding: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
												<Icon
													name="left"
													color={'white'}
													size={20}
													onPress={() => {
														this.props.navigation.goBack();
													}}
												/>
												<Text style={{ color: '#FFF' }}>
													SKIP
													</Text>
											</View>
											<View>
												<View style={{ width: '100%', padding: 20, flexDirection: 'row', alignItems: 'center' }}>
													<View style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 15, backgroundColor: primary_color }}>
														<Icon
															name="plus"
															color={'#FFF'}
															size={16}
														/>
													</View>
													<Text style={{
														marginLeft: '1%',
														fontSize: 14,
														letterSpacing: 1,
														marginTop: 3,
														flexShrink: 1,
														fontFamily: 'SFUIDisplay-Regular',
														color: '#FFF', marginLeft: 10
													}}>
														Please upload the photo for your account
													</Text>
												</View>
											</View>
										</ImageBackground>
									)}
							</TouchableOpacity>



							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									backgroundColor: '#FFFFFF',
									marginTop: -10,
									paddingTop: '10%',
									borderTopLeftRadius: 13,
									borderTopRightRadius: 13,
								}}
							>
								<Text style={{
									fontSize: 22,
									fontWeight: 'bold',
									alignSelf: 'flex-start',
									fontFamily: 'AirbnbCerealApp-Bold',
									marginHorizontal: "3%",
								}}>Tell about yourself</Text>

								<Text style={{
									fontSize: 14,
									marginTop: 3,
									marginHorizontal: "3%",
									fontFamily: 'SFUIDisplay-Regular'
								}}>
									The more you tell about yourself, more people would be able to notice you</Text>

								{fields.map((item, index) => {
									return (
										<SingleSelectButton
											options={item.options}
											selected={this.state[item.stateName]}
											title={item.title}
											key={`field_${index}`}
											style={{ justifyContent: 'space-between' }}
											buttonStyle={{ width: "45%" }}
											onChange={(e) => this.onChangeFields(item.stateName, e)}
										/>
									);
								})}

								{Platform.OS === 'ios' ? (
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
											style={{flex:1}}
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
												titleStyle={{ color: '#222124' }}
												inputContainer={localStyles.inputContainer}
												customContainerTextInput={localStyles.textInputStyle}
												TextInputStyle={localStyles.textInputTitle}
												placeholder="Date Of birth"
												onChangeText={(e) => {
													this.onChangeText('DOB', e);
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
															source={require('../../../assets/calendar.png')}
														/>
													</TouchableOpacity>
												}
											/>
										</TouchableOpacity>
									)}

								{showDatePicker ? (
									<DateTimePicker
										value={DOB ? new Date(DOB) : new Date()}
										mode={'date'}
										style={{ width: '100%' }}
										onChange={(e, date) => {
											// console.log("---onChange Date Picker --->>>", date)
											this.setState({ DOB: date, showDatePicker: false }, () => {
												// this.changeError('DOB');
											});
										}}
									/>
								) : null}
								{error['DOB'] ? (
									<View style={[style.errorMessageContainerStyle]}>
										<Text style={style.errorMessageTextStyle}>{error['DOB']}</Text>
									</View>
								) : null}

								<Button
									onPress={this.onDone}
									title="NEXT"
									style={[localStyles.registerButton, { width: '93%', marginTop: 15, marginBottom: 10 }]}
								/>
								<View style={{flexDirection: 'row'}}>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: primary_color}}>

									</View>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray'}}>
										
									</View>
									<View style={{height:5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray'}}>
										
									</View>
								</View>
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
		access_token: state.user.access_token || state.user.register_token,
		isUpdate: !!state.user.access_token,
		userProfileData: {
			ethnicity: state.user.ethnicity,
			bodyType: state.user.body_type,
			hairColor: state.user.hair_style,
			eyeColor: state.user.eyes_color,
			DOB: state.user.birthday,
			gender: state.user.gender === 1 ? 'male' : 'female',
			DOB: state.user.DOB,
			horoscopeType: state.user.preferred_horoscope_type,
			drink: state.user.drink === 1 ? 'Yes' : 'No',
			smoke: state.user.smoke === 1 ? 'Yes' : 'No',
			children: state.user.children === 1 ? 'Yes' : 'No',
			lang: state.user.preferred_language,
			height: state.user.height,
			avatar: state.user.avatar,
			about: state.user.about
		},
		aboutMe: state.user.aboutMe,
		aboutMe2: state.user.aboutMe2,
		goToAddProfile: state.user.goToAddProfile,
		goToProfile: state.user.goToProfile,
		clearErrorProfile: (errorType) => {
			dispatch(clearErrorProfile(errorType));
		},
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		continueRegisteration_insertProfile: (payload, token) => {
			dispatch(continueRegisteration_insertProfile(payload, token));
		},
		updateProfile: (payload, token) => {
			dispatch(updateProfile(payload, token));
		},
		addAvatar: ({ source, access_token }) => {
			dispatch(addAvatar({ source, access_token }));
		},
		insertProfile: (payload, token, about) => {
			dispatch(insertProfile(payload, token, about))
		},
		dispatch

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContinueRegisteration);

const primary_color = 'rgb(30, 20, 96)';


const localStyles = StyleSheet.create({
	add_image: {
		height: 100,
		width: 100,
		alignSelf: 'center'
	},
	title: {
		fontSize: 16
	},
	registerButton: {
		backgroundColor: 'rgb(30, 20, 96)',
		color: 'white',
		alignSelf: 'center',
		borderRadius: 10
	},
	textInputTitle: {
		fontSize: 16,
		color: 'black',
	},
	// textInputStyle: {
	// 	borderBottomWidth: 1,
	// 	borderBottomColor: 'grey',
	// 	color: 'black',
	// 	paddingLeft: 10
	// },
	calendar: {
		height: 18,
		width: 30,
	},
	textInputStyle: {
		color: 'black',
		alignSelf: 'center',
		marginTop: 10,
		height: 'auto',
	},
	inputContainer: {
		backgroundColor: 'rgb(250, 250, 250)',
		borderWidth: 1,
		borderRadius: 5,
		maxHeight: 250,
		justifyContent: 'flex-start',
		borderColor: '#ddd'
	},
});
