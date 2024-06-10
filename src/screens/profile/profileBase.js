import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { Platform, Alert } from 'react-native';

export default class profileBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFavIcon: true
		};
	}
	componentDidMount = () => {
		if (!this.props.navigation.isFirstRouteInParent()) {
			let fav = this.checkFav();
			fav ? this.setState({ showFavIcon: false }) : this.setState({ showFavIcon: true });
		}
	};
	favourite = () => {
		if (!this.checkFav()) {
			this.props.AddFavourite({
				access_token: this.props.access_token,
				favourite_id: this.props.navigation.state.params.detail.id
			});
			Alert.alert(
				'Favourites',
				'This person is added in favourites!!',
				[ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
				{ cancelable: false }
			);
			this.setState({ showFavIcon: false });
			return;
		}
		this.props.removeFavourite({
			access_token: this.props.access_token,
			favourite_id: this.props.navigation.state.params.detail.id
		});
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

					let source = {};
					source.uri = response.uri;
					source.name = response.fileName;
					// source.name = result.name;
					// source.uri = result.uri;
					source.fileSize = response.fileSize;
					source.type = 'image/jpeg';
					this.props.uploadImage({ access_token: this.props.access_token, source });
					// ImageResizer.createResizedImage(response.uri, 100, 100, 'JPEG', 100)
					// 	.then((result) => {
					// 		const source = result;
					// 		source.uri = result.uri;
					// 		source.fileSize = result.size;
					// 		this.props.uploadImage({ access_token: this.props.access_token, source });
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
					this.props.uploadImage({ access_token: this.props.access_token, source });
					// })
					// .catch((err) => {
					// 	alert('Error while uploading image! Please try again.');
					// 	console.log(err);
					// });
				}
			});
		}
	};
	checkFav = () => {
		let fav = this.props.favourite.filter((fav) => fav.id === this.props.navigation.state.params.detail.id);
		return fav.length;
	};
}
