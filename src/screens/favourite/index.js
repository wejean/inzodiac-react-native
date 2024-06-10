import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, ImageBackground, Image, StatusBar, Dimensions } from 'react-native';
import SearchInput from '../../components/SearchInput';
import Base from './base';
import UserCard from '../../components/UserCard';
import Header from '../../components/Header';
import { getFavourites } from '../../redux/actions/favourite';
import Loading from '../loading';
import { connect } from 'react-redux';
const profilePhoto = require('../../assets/img/profile_photo.png');
import moment from 'moment';

const backgroundColor = '#FFFFFF';

class Favourite extends Base {
	navigateToUserProfile = (index) => {
		this.props.navigation.navigate('Profile', { detail: this.props.favourite[index] });
	};
	render() {
		return this.props.loading ? (
			<Loading />
		) : (
				<ScrollView style={Local_styles.container} keyboardShouldPersistTaps="always">
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : null}
						style={[Local_styles.container, { flex: 1, width: '100%' }]}
						keyboardShouldPersistTaps="always"
					>
						{Header(<>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<View>
									<Text style={Local_styles.title}>My Matches</Text>
									<Text style={Local_styles.subTitle}>You have {this.props.total} Matches Friends</Text>
								</View>
								<View
									style={{
										height: 80,
										width: 80,
										borderRadius: 40,
										borderColor: '#FFFFFF',
										backgroundColor: '#FFFFFF',
										borderWidth: 3,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Text style={Local_styles.ques}>PLAY THE GAME</Text>
								</View>
							</View>
						</>)}
						<View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
							<SearchInput value={this.state.search} defaultValue="Search" onChangeText={this.onChangeText} />
						</View>

						{this.props.favourite.length > 0 ? (
							<View
								style={{
									flex: 1,
									width: '100%',
									backgroundColor: backgroundColor,
									flexDirection: 'row',
									display: 'flex',
									alignItems: 'flex-start',
									justifyContent: 'flex-start',
									flexWrap: 'wrap'
								}}
							>
								{this.props.favourite.map((fav, index) => (
									<UserCard
										iconName={fav.avatar.length > 0 ? fav.avatar : profilePhoto}
										name={fav.name}
										age={moment().diff(fav.birthday, 'years')}
										location={`${fav.city}, ${fav.country}`}
										count={fav.photos ? fav.photos.length : 0}
										myOwn={false}
										navigateToUserProfile={this.navigateToUserProfile}
										key={`${index}`}
										index={index}
									/>
								))}
							</View>
						) : (
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={Local_styles.title}>No Favourite found !!</Text>
								</View>
							)}
					</KeyboardAvoidingView>
				</ScrollView>
			);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.favourite.loading,
		err: state.favourite.err,
		access_token: state.user.access_token,
		favourite: state.favourite.favourites,
		total: state.favourite.total
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getFavourites: ({ access_token, name }) => {
			dispatch(getFavourites({ access_token, name }));
		},
		dispatch
	};
};

const primary_color = 'rgb(30, 20, 96)';

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
const Local_styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: backgroundColor
	},
	header: {
		padding: '4%',
		height: Dimensions.get('window').width * 0.6,
		width: Dimensions.get('window').width,
		justifyContent: 'center'
		// backgroundColor: 'red'
	},
	title: {
		// marginTop: 30,
		// marginLeft: 10,
		marginLeft: '1%',
		fontSize: 22,
		fontWeight: 'bold',
		color: '#FFFFFF',
		fontFamily: 'AirbnbCerealApp-Bold'
	},
	ques: {
		// marginTop: 30,
		// marginLeft: 10,
		fontSize: 14,
		color: primary_color,
		textAlign: 'center',
		alignSelf: 'center',
		flexShrink: 1,
		fontFamily: 'AirbnbCerealApp-Bold'
	},
	subTitle: {
		marginLeft: '1%',
		color: '#FFFFFF',
		fontSize: 14,
		letterSpacing: 1,
		marginTop: 3,
		fontFamily: 'SFUIDisplay-Regular'
	}
});
