import get from 'lodash/get';
import moment from 'moment';
import React from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { AddFavourite, removeFavourite } from '../../redux/actions/favourite';
import { uploadImage } from '../../redux/actions/user';
import Base from './profileBase';
const profilePhoto = require('../../assets/img/profile_photo.png');


class Profile extends Base {
	static navigationOptions = {
		header: null
	};
	render() {
		let details = [
			{
				name: 'Ethnicity',
				imageName: 'ethnicity',
				key: 'ethnicity'
			},
			{
				name: 'Preferred Language',
				imageName: 'lang',
				key: 'preferred_language'
			},
			{
				name: 'Hair Style',
				imageName: 'hair',
				key: 'hair_style'
			},
			{
				name: 'Body Type',
				imageName: 'body',
				key: 'body_type'
			},
			{
				name: 'Preferred Horoscope Type',
				imageName: 'horoscope',
				key: 'preferred_horoscope_type'
			},
			{
				name: 'Relationship Status',
				imageName: 'relationship',
				key: 'relation_ship'
			}
		];
		let detail = !this.props.navigation.isFirstRouteInParent()
			? this.props.navigation.state.params.detail
			: { ...this.props.user };
		return (
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					alignItems: 'center',
					justifyContent: 'space-evenly'
				}}
			>
				<StatusBar hidden={true} />
				<View style={{ flex: 1, width: '100%', marginBottom: 10 }}>
					<View style={{ height: 350, width: '100%' }}>
						<ImageBackground
							source={
								detail.avatar ? { uri: detail.avatar } : require('../../../assets/user.png')
							}
							style={{ height: 350, width: '100%', opacity: 0.9, backgroundColor: '#000000' }}
						>
							{!this.props.navigation.isFirstRouteInParent() ? (
								<TouchableOpacity
									style={{
										position: 'absolute',
										height: 20,
										width: 20,
										top: 40,
										left: 20
									}}
									onPress={() => {
										this.props.navigation.goBack();
									}}
								>
									<Icon
										name="left"
										color={'white'}
										size={20}

									/>

								</TouchableOpacity>
							) : null}

						</ImageBackground>
					</View>

					<View style={{
						padding: 20, paddingVertical: 45, backgroundColor: '#FFF'
						, alignItems: 'center', 
						borderTopLeftRadius: 25,
						borderTopRightRadius: 25,
						marginTop: -25
					}}>
						<View
							style={{
								width: '60%',
								flexDirection: 'row',
								top: -30,
								right: 0,
								height: 60,
								position: 'absolute',
								borderTopLeftRadius: 50,
								borderBottomLeftRadius: 50,
								backgroundColor: primary_color,
								alignItems: 'center',
								justifyContent: 'space-evenly'
							}}
						>
							<View style={[local_styles.horoContainer]}>
								<Image
									source={{ uri: `${get(detail, 'chinese_detail.0.sign', '').toLowerCase()}_white` }}
									resizeMode="contain"
									style={{ height: 25, width: 25 }}
								/>
								<Text style={local_styles.horoText}>
									{get(detail, 'chinese_detail.0.sign', '')}
								</Text>
							</View>
							<View style={local_styles.horoContainer}>
								<Image
									source={{ uri: `${get(detail, 'western_detail[0].sign', '').toLowerCase()}_white` }}
									resizeMode="contain"
									style={{ height: 25, width: 25 }}
								/>
								<Text style={local_styles.horoText}>
									{detail.western_detail && detail.western_detail[0].sign}
								</Text>
							</View>
						</View>
						<View
							style={{
								width: '100%',
							}}
						>
							<View
								style={[
									local_styles.detailTiles,
								]}
							>
								<View style={local_styles.nameContainer}>
									<Text style={local_styles.nameText}>{detail.name}</Text>
									<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
										<Text style={local_styles.ageText}>
											{moment().diff(detail.birthday, 'years')}, {detail.gender ? 'Male' : 'Female'}
										</Text>

										<View style={local_styles.detailTileRight}>
											<Text style={[local_styles.titleStyle, { color: '#222124' }]}>
												{detail.birthday}
											</Text>
										</View>
									</View>

								</View>

							</View>
							<View
								style={[
									local_styles.detailTiles,
									{
										// position: 'absolute',
										// top: 0,
										paddingRight: 20,
										paddingLeft: 20
									}
								]}
							>

							</View>
						</View>

						{!detail.about_me ? (
							<View style={local_styles.detailTiles}>

								<View style={{ marginBottom: 20 }}>
									<Text style={local_styles.titleStyle}>About me</Text>
									<Text style={[local_styles.titleStyle, { color: '#222124' }]}>about me{detail.about_me}</Text>
								</View>
							</View>
						) : null}
						{this.props.navigation.isFirstRouteInParent() || (detail.photos && detail.photos.length) ? (
							<View style={local_styles.detailTiles}>
								<Text style={local_styles.titleStyle}>My Photos</Text>
								{this.props.navigation.isFirstRouteInParent() && (
									<TouchableOpacity onPress={this.onAddImage}>
										<Text style={local_styles.titleStyle}>+ Add More</Text>
									</TouchableOpacity>
								)}
							</View>
						) : null}
						{detail.photos && detail.photos.length ? (
							<View
								style={{
									justifyContent: 'flex-start',
									width: '100%',
									flex: 1,
									flexDirection: 'row'
								}}
							>
								<ScrollView
									style={local_styles.photoContainer}
									horizontal={true}
									alwaysBounceHorizontal={true}
								>
									{detail.photos &&
										detail.photos.map((item, ind) => {
											return (
												<Image
													key={ind}
													source={{ uri: `${item.filename}` }}
													style={{ height: 100, width: 100, margin: 5 }}
												/>
											);
										})}
								</ScrollView>
							</View>
						) : null}
						<Text style={[local_styles.titleStyle, { alignSelf: 'flex-start', marginVertical: 10 }]}>{detail.name} has completed 6 out of 36 details</Text>
						{details.map((item, ind) => {
							return (
								<View style={local_styles.detailTiles} key={ind}>
									<View style={local_styles.detailTileLeft}>
										<Text style={local_styles.titleStyle}>{item.name}</Text>
									</View>
									<View style={local_styles.detailTileRight}>
										<Text style={(local_styles.titleStyle, { color: 'black' })}>
											{detail[item.key]}
										</Text>
									</View>
								</View>
							);
						})}
					</View>
					{!this.props.navigation.isFirstRouteInParent() ? (
						<View style={{ flexDirection: 'row', width: "50%", justifyContent: 'space-evenly', alignSelf: 'center' }}>

							{this.state.showFavIcon && (
								<TouchableOpacity
									onPress={this.favourite}
									style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: primary_color, justifyContent: 'center', alignItems: 'center' }}
								>
									<Image
										source={require('../../../assets/Like.png')}
										resizeMode="contain"
										style={{
											height: 25,
											width: 25,
										}}
									/>
								</TouchableOpacity>
							)}
							{(this.props.user &&
								this.props.user.gender) ? (
									<TouchableOpacity
										onPress={
											() => {
												this.props.navigation.navigate('Message', { memberId: detail.id, userId: this.props.userId, avatar: detail.avatar, name: detail.name });
											}
										}
										style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: primary_color, justifyContent: 'center', alignItems: 'center' }}
									>
										<Image
											source={require('../../../assets/message.png')}
											resizeMode="contain"
											style={{
												height: 25,
												width: 25
											}}
										/>
									</TouchableOpacity>
								) : null}
						</View>
					) : (
							<>
								<TouchableOpacity
									style={{
										height: 40,
										width: 40,
										position: 'absolute',
										borderRadius: 20,
										justifyContent: 'center',
										alignItems: 'center',
										top: 75,
										right: 20,
										backgroundColor: primary_color,
									}}
									onPress={() => {
										this.props.navigation.navigate('AddProfile');
									}}
								>
									<Image
										source={require('../../../assets/editicon.png')}
										resizeMode="contain"
										style={{
											height: 20,
											width: 20
										}}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 40,
										width: 40,
										position: 'absolute',
										borderRadius: 20,
										justifyContent: 'center',
										alignItems: 'center',
										top: 135,
										right: 20,
										backgroundColor: primary_color,
									}}
									onPress={() => {
										this.props.navigation.navigate('Settings');
									}}
								>
									<Image
										source={require('../../../assets/settingsicon.png')}
										resizeMode="contain"
										style={{
											height: 20,
											width: 20
										}}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										height: 40,
										width: 40,
										position: 'absolute',
										borderRadius: 20,
										justifyContent: 'center',
										alignItems: 'center',
										top: 195,
										right: 20,
										backgroundColor: primary_color,
									}}
									onPress={() => {
										this.props.navigation.navigate('Game');
									}}
								>
									<Text style={{ color: '#FFF', fontSize: 12 }}>36</Text>
									<Image
										source={require('../../../assets/icon.png')}
										resizeMode="contain"
										style={{
											height: 20,
											width: 20
										}}
									/>
								</TouchableOpacity>
							</>
						)}

				</View>
			</ScrollView>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.matches.loading,
		access_token: state.user.access_token,
		matches: state.matches.matches,
		user: state.user,
		userId: state.user.id,
		favourite: state.favourite.favourites,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		AddFavourite: ({ access_token, favourite_id }) => {
			dispatch(AddFavourite({ access_token, favourite_id }));
		},
		removeFavourite: ({ access_token, favourite_id }) => {
			dispatch(removeFavourite({ access_token, favourite_id }));
		},
		uploadImage: ({ access_token, source }) => {
			dispatch(uploadImage({ access_token, source }));
		},
		dispatch
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const primary_color = 'rgb(30, 20, 96)';

const local_styles = StyleSheet.create({
	detailTiles: {
		width: '100%',
		paddingBottom: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	detailTileLeft: {
		flex: 3,
		padding: 5,
		paddingLeft: 0,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	detailTileRight: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	titleStyle: {
		fontSize: 14,
		color: 'grey',
		fontFamily: 'SFUIDisplay-Regular'
	},
	detailText: {
		flex: 1,
		color: '#17366d',
		fontSize: 16,
		marginTop: 10,
		fontFamily: 'SFUIDisplay-Regular'
	},
	nameContainer: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	nameText: {
		fontSize: 24,
		// color: '#17366d',
		color: 'black',
		fontWeight: '500',
		fontFamily: 'SFUIDisplay-Bold'
	},
	horoContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	horoText: {
		color: '#FFFFFF',
		fontSize: 14,
		fontFamily: 'SFUIDisplay-Regular'
	},
	ageText: {
		color: 'black',
		fontSize: 14,
		fontFamily: 'SFUIDisplay-Bold'
	},
	photoContainer: {
		height: 100,
		flexDirection: 'row',
		color: 'red'
	}
});
