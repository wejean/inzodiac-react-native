import { Component } from 'react';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
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
			smoke: 'Yes',
			children: 'No',
			lang: 'English',
			height: null,
			avatarSource: ''
		};
	}

	componentDidMount() {
		this.props.clearProfile();
	}
	static getDerivedStateFromProps(props, state) {
		if (state.userProfileData !== props.userProfileData) {
			return { userProfileData: props.userProfileData, ...props.userProfileData };
		}
		return null;
	}
	componentDidUpdate(prevProps) {
		console.log('\n\n\n\n\n',prevProps);

		if(!prevProps.goToHome && this.props.goToHome && this.props.aboutMe){
			this.props.navigation.navigate('ContinueRegisteration');
		}
		else if (!prevProps.goToHome && this.props.goToHome) {
			this.props.navigation.navigate('AuthLoading');
		} else if (!prevProps.goToProfile && this.props.goToProfile) {
			this.props.navigation.navigate('Profile');
		}
	}

	onChangeFields = (name, value) => {
		this.setState({ [name]: value });
	};
	onChangeText = (name, value) => {
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
	onDone = () => {
		const { updateProfile, access_token, isUpdate, insertProfile } = this.props;
		const {
			ethnicity,
			bodyType: body_type,
			horoscopeType: preferred_horoscope_type,
			eyeColor: eyes_color,
			hairColor: hair_style,
			drink,
			smoke,
			lang: preferred_language,
			height
		} = this.state;

		const data = {
			ethnicity,
			body_type,
			preferred_horoscope_type,
			eyes_color,
			hair_style,
			drink: drink === 'Yes' ? 1 : 0,
			smoke: smoke === 'Yes' ? 1 : 0,
			preferred_language
		};

		if (height) {
			data['height'] = height;
		}

		isUpdate ? updateProfile(data, access_token) : insertProfile(data, access_token);
	};
}
