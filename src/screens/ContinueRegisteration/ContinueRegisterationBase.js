import { isEmpty } from 'lodash';
import moment from 'moment';
import { Component } from 'react';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { PROFILE_UPDATE_FAIL } from '../../redux/actions/user';

const errorTypeMap = {
	DOB: 'birthday',
	about: 'about'
};

export default class AddProfileBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ethnicity: 'American',
			bodyType: 'Skinny',
			hairColor: 'Red',
			eyeColor: 'Red',
			horoscopeType: 'Eastern',
			maritalStatus: 'Yes',
			drink: 'No',
			about: '',
			smoke: 'Yes',
			children: 'No',
			lang: 'English',
			height: null,
			gender: '',
			DOB: new Date(),
			avatarSource: '',
			showDatePicker: false,
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (state.userProfileData !== props.userProfileData) {
			return { userProfileData: props.userProfileData, ...props.userProfileData };
		}
		return null;
	}
	componentDidUpdate(prevProps) {
		// alert(this.props.userProfileData.avatar)
		if(this.props.aboutMe && this.props.aboutMe2)
		{
			this.props.navigation.navigate('AuthLoading');
			// else if (!prevProps.goToProfile && this.props.goToProfile) {
			// 	this.props.navigation.navigate('Profile');
			// }
		}
		else
		{
			if (!prevProps.goToAddProfile && this.props.goToAddProfile) {
				this.props.navigation.navigate('AddProfile');
			} 
		}

	}

	onChangeFields = (name, value) => {
		this.setState({ [name]: value });
	};

	onChangeText = (name, value) => {
		const { error, clearErrorProfile } = this.props;
		const errorType = errorTypeMap[name];
		if (error && errorType && error[errorType]) {
			clearError(errorType);
		}

		this.setState({ [name]: value });
	};

	onAddImage = () => {
		if (Platform.OS === 'ios') {
			var options = {
				title: 'Choose Image',
				maxHeight: 500,
				quality: 70,
				mediaType: 'photo',
				storageOptions: {
					path: 'images',
					skipBackup: true
				}
			};
			ImagePicker.showImagePicker(options, (response) => {
				if (response.didCancel) {
					return;
				} else if (response.error) {
					console.warn('response.error', response.error);
					alert('Error in uploading image');
					return;
				} else {
					console.log('the response is---->>>', response);
					// ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100)
					// 	.then((result) => {
					let source = {};
					source.uri = response.uri;
					source.name = response.fileName;
					// source.name = result.name;
					// source.uri = result.uri;
					source.fileSize = response.fileSize;
					source.type = 'image/jpeg';
					this.props.addAvatar({ access_token: this.props.access_token, source });
					// ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100)
					// 	.then((result) => {
					// 		const source = result;
					// 		source.uri = result.uri;
					// 		source.fileSize = result.size;
					// 		this.props.addAvatar({ access_token: this.props.access_token, source });
					// 		this.setState({
					// 			avatarSource: source
					// 		});
					// 		// }
					// 	})
					// 	.catch((err) => {
					// 		alert('Error while uploading image! Please try again.');
					// 	});
				}
			});
		} else {
			var options = {
				title: 'Choose Image',
				storageOptions: {
					path: 'images'
				}
			};
			ImagePicker.showImagePicker(options, (response) => {
				if (response.didCancel) {
					return;
				} else if (response.error) {
					console.warn('response.error', response.error);
					alert('Error in uploading image');
					return;
				} else {
					console.log('the response is---->>>', response);
					// ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100)
					// 	.then((result) => {
					let source = {};
					source.uri = response.uri;
					source.name = response.fileName;
					// source.name = result.name;
					// source.uri = result.uri;
					source.fileSize = response.fileSize;
					source.type = 'image/jpeg';
					this.props.addAvatar({ access_token: this.props.access_token, source });
					// ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100)
					// 	.then((result) => {
					// let source = {};
					// source.name = result.name;
					// source.uri = result.uri;
					// source.fileSize = result.size;
					// source.type = 'image/jpeg';
					// this.props.addAvatar({ access_token: this.props.access_token, source });
					// })
					// .catch((err) => {
					// 	alert('Error while uploading image! Please try again.');
					// 	console.log(err);
					// });
				}
			});
		}
	};
	
	onCheckValidation = () => {
		const { dispatch } = this.props;

		let payload = {};
	
		if (!this.state.DOB) {
			payload['birthday'] = 'D.O.B cannot be empty';
		}
		if (this.state.gender === '') {
			payload['gender'] = 'Gender cannot be empty';
		}

		console.log(payload);
	
		if (!isEmpty(payload)) {
			console.log('in the dispatch');
			dispatch({
				type: PROFILE_UPDATE_FAIL,
				payload: { error: payload }
			});
			return false;
		}
		return true;
	};

	onContinue = () => {
		const { updateProfile, access_token, isUpdate, continueRegisteration_insertProfile, insertProfile } = this.props;
			const {
				about
			} = this.state;
			
			const data = {
				about
			};

			console.log('\n\n\n\ndata is:', data, '\n\n\n\n');
	
			isUpdate ? updateProfile(data, access_token) : insertProfile(data, access_token, true);
	}

	onDone = () => {
		if(this.onCheckValidation())
		{
			const { updateProfile, access_token, isUpdate, continueRegisteration_insertProfile } = this.props;
			const {
				ethnicity,
				bodyType: body_type,
				horoscopeType: preferred_horoscope_type,
				eyeColor: eyes_color,
				hairColor: hair_style,
				drink,
				smoke,
				lang: preferred_language,
				height,
				DOB,
				gender
			} = this.state;
			
			const data = {
				ethnicity,
				body_type,
				preferred_horoscope_type,
				eyes_color,
				hair_style,
				birthday: moment(new Date(DOB)).format('YYYY-MM-DD'),
				gender: gender === 'male' ? 1 : 0,
				drink: drink === 'Yes' ? 1 : 0,
				smoke: smoke === 'Yes' ? 1 : 0,
				preferred_language
			};
	
			if (height) {
				data['height'] = height;
			}

			console.log('\n\n\n\ndata1 is:', data, '\n\n\n\n');

	
			isUpdate ? updateProfile(data, access_token) : continueRegisteration_insertProfile(data, access_token);
		}
		
	};
}
