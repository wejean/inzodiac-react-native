import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/button';
import Header from '../../components/Header';
import SingleSelectButton from '../../components/SingleSelectButton';
import TextInput from '../../components/TextInput';
import { addAvatar, CLEAR_PROFILE, insertProfile, updateProfile } from '../../redux/actions/user';
import Loading from '../loading';
import Base from './AddProfileBase';

class AddProfile extends Base {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		};
	};
	render() {
		let fields = [
			{
				title: 'Ethnicity',
				options: ['American', 'Asian', 'African', 'White', 'Latin', 'Others'],
				stateName: 'ethnicity'
			},
			{
				title: 'Your Body Type',
				options: ['Skinny', 'Fit', 'Fatty', 'Mascular', 'Athletic', 'Others'],
				stateName: 'bodyType'
			},
			{
				title: 'Your Hair Color',
				options: ['Red', 'Black', 'Brown', 'White', 'Others'],
				stateName: 'hairColor'
			},
			{
				title: 'Your Eye Color',
				options: ['Red', 'Black', 'Brown', 'Others'],
				stateName: 'eyeColor'
			},
			{
				title: 'Your Preferred Horoscope Type',
				options: ['Eastern', 'Western'],
				stateName: 'horoscopeType'
			},
			{
				title: 'Are you Married?',
				options: ['Yes', 'No'],
				stateName: 'maritalStatus'
			},
			{
				title: 'Wants Children?',
				options: ['Yes', 'No'],
				stateName: 'children'
			},
			{
				title: 'Do you Smoke?',
				options: ['Yes', 'No'],
				stateName: 'smoke'
			},
			{
				title: 'Do you Drink?',
				options: ['Yes', 'No'],
				stateName: 'drink'
			},
			{
				title: 'Preferred Language',
				options: ['English', 'French'],
				stateName: 'lang'
			}
		];
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
								}}>Details About You</Text>
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
								padding: 10,
								flexDirection: 'column'
							}}
						>
							{/* {this.props.aboutMe===true || this.props.aboutMe===null || this.props.goToProfile? */}
							{/* <TouchableOpacity
							onPress={this.onAddImage}
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10,
								marginBottom: 15
							}}
						>
							{this.props.userProfileData.avatar ? (
								<React.Fragment>
									<ImageBackground
										resizeMode="cover"
										style={{
											height: 120,
											width: 120,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
											// alignContent: 'center'
										}}
										source={{
											uri: 'border'
										}}
									>
										<Image
											resizeMode="cover"
											style={localStyles.add_image}
											source={{ uri: this.props.userProfileData.avatar }}
										/>
									</ImageBackground>
								</React.Fragment>
							) : (
								<Image
									resizeMode="contain"
									style={localStyles.add_image}
									source={{ uri: 'add_image' }}
								/>
							)}
							<Text style={[ localStyles.title, { alignSelf: 'center', marginTop: 10 } ]}>
								{'Add Profile Image'}
							</Text>
						</TouchableOpacity>
						:
						null
						} */}
							
							{fields.map((item, index) => {
								return (
									index !== 2?
									<SingleSelectButton
										options={item.options}
										selected={this.state[item.stateName]}
										title={item.title}
										key={`field_${index}`}
										onChange={(e) => this.onChangeFields(item.stateName, e)}
									/>
									:
									<>
									
									<TextInput
									value={`${this.state.height || ''}`}
									errorField={false}
									customContainerTextInput={localStyles.textInputStyle}
									TextInputStyle={localStyles.textInputStyle}
									titleStyle={{ color: 'black' }}
									inputContainer={localStyles.inputContainer}
									placeholder="Enter Your height"
									onChangeText={(e) => {
										this.onChangeText('height', e);
									}}
									icon2={<Text>cm</Text>}
									/>
										<SingleSelectButton
										options={item.options}
										selected={this.state[item.stateName]}
										title={item.title}
										key={`field_${index}`}
										onChange={(e) => this.onChangeFields(item.stateName, e)}
									/>
									</>
								);
							})}
							<Button
								onPress={this.onDone}
								title="Done"
								style={[localStyles.registerButton, { width: '93%', marginTop: 15, marginBottom: 10 }]}
							/>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ height: 5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray' }}>

								</View>
								<View style={{ height: 5, marginHorizontal: 5, width: 10, backgroundColor: primary_color }}>

								</View>
								<View style={{ height: 5, marginHorizontal: 5, width: 10, backgroundColor: 'lightgray' }}>

								</View>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			);
	}
}

const primary_color = 'rgb(30, 20, 96)';

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
			horoscopeType: state.user.preferred_horoscope_type,
			drink: state.user.drink === 1 ? 'Yes' : 'No',
			smoke: state.user.smoke === 1 ? 'Yes' : 'No',
			children: state.user.children === 1 ? 'Yes' : 'No',
			lang: state.user.preferred_language,
			height: state.user.height,
			avatar: state.user.avatar
		},
		aboutMe: state.user.aboutMe,
		goToHome: state.user.goToHome,
		goToProfile: state.user.goToProfile,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		insertProfile: (payload, token) => {
			dispatch(insertProfile(payload, token));
		},
		updateProfile: (payload, token) => {
			dispatch(updateProfile(payload, token));
		},
		clearProfile: () => ({ type: CLEAR_PROFILE }),
		addAvatar: ({ source, access_token }) => {
			dispatch(addAvatar({ source, access_token }));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProfile);

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
		color: 'black'
	},
	// textInputStyle: {
	// 	borderWidth: 1,
	// 	borderBottomColor: 'grey',
	// 	color: 'black',
	// 	paddingLeft: 10
	// },
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
