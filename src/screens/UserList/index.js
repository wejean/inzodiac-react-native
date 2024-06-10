import memoizeOne from 'memoize-one';
import moment from 'moment';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import countryAndCities from '../../assets/countryAndCities.json';
import Button from '../../components/button';
import DropDown from '../../components/Dropdown';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import UserCard from '../../components/UserCard';
import { clearFilters, getFilters, getMatches, updateFilters } from '../../redux/actions/matches';
import Loading from '../loading';
import UserListBase from './base';

const backgroundColor = 'rgb(245,245,245)';
const blueColor = 'rgb(22,32,99)';
const textColor = 'rgb(27,26,31)';
const profilePhoto = require('../../assets/img/profile_photo.png');

// const categories = [
// 	{
// 		iconName: profilePhoto,
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego',
// 		myOwn: true
// 	},
// 	{
// 		iconName: profilePhoto,
// 		title: 'Opposites Attract',
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego'
// 	},
// 	{
// 		iconName: profilePhoto,
// 		title: 'More Understanding Required',
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego'
// 	},
// 	{
// 		iconName: profilePhoto,
// 		title: 'Passion Potential',
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego'
// 	},
// 	{
// 		iconName: profilePhoto,
// 		title: 'Wildcard',
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego'
// 	},
// 	{
// 		iconName: profilePhoto,
// 		title: 'Our Pick',
// 		name: 'Willian',
// 		age: 22,
// 		count: 5,
// 		location: 'San Diego'
// 	}
// ];

const western_horoscopes = [
	{
		name: 'Aquarius',
		blue: require('../../../assets/icons_west/Aquarius.png'),
		white: require('../../../assets/icons_west/Aquarius_white.png'),
	},
	{
		name: 'Sagittarius',
		blue: require('../../../assets/icons_west/Sagittarius.png'),
		white: require('../../../assets/icons_west/Sagittarius_white.png'),
	},
	{
		name: 'Pisces',
		blue: require('../../../assets/icons_west/Pisces.png'),
		white: require('../../../assets/icons_west/pisces_white.png'),
	},
	{
		name: 'Capricorn',
		blue: require('../../../assets/icons_west/Capricorn.png'),
		white: require('../../../assets/icons_west/Capricorn_white.png'),
	},
	{
		name: 'Leo',
		blue: require('../../../assets/icons_west/Leo.png'),
		white: require('../../../assets/icons_west/Leo_white.png'),
	},
	{
		name: 'Virgo',
		blue: require('../../../assets/icons_west/Virgo.png'),
		white: require('../../../assets/icons_west/Virgo_white.png'),
	},
	{
		name: 'Cancer',
		blue: require('../../../assets/icons_west/Cancer.png'),
		white: require('../../../assets/icons_west/Cancer_white.png'),
	},
	{
		name: 'Libra',
		blue: require('../../../assets/icons_west/Libra.png'),
		white: require('../../../assets/icons_west/Libra_white.png'),
	},
	{
		name: 'Scorpio',
		blue: require('../../../assets/icons_west/Scorpio.png'),
		white: require('../../../assets/icons_west/Scorpio_white.png'),
	},
	{
		name: 'Gemini',
		blue: require('../../../assets/icons_west/Gemini.png'),
		white: require('../../../assets/icons_west/Gemini_white.png'),
	},
	{
		name: 'Taurus',
		blue: require('../../../assets/icons_west/Taurus.png'),
		white: require('../../../assets/icons_west/Taurus_white.png'),
	},
	{
		name: 'Aries',
		blue: require('../../../assets/icons_west/Aries.png'),
		white: require('../../../assets/icons_west/Aries_white.png'),
	},
]

const chinese_horoscope = [
	{
		name: 'Rat',
		blue: require('../../../assets/icons_chinese/rat_blue.png'),
		white: require('../../../assets/icons_chinese/rat_white.png'),
	},
	{
		name: 'Ox',
		blue: require('../../../assets/icons_chinese/ox_blue.png'),
		white: require('../../../assets/icons_chinese/ox_white.png'),
	},
	{
		name: 'Tiger',
		blue: require('../../../assets/icons_chinese/tiger_blue.png'),
		white: require('../../../assets/icons_chinese/tiger_white.png'),
	},
	{
		name: 'Rabbit',
		blue: require('../../../assets/icons_chinese/rabbit_blue.png'),
		white: require('../../../assets/icons_chinese/rabbit_white.png'),
	},
	{
		name: 'Dragon',
		blue: require('../../../assets/icons_chinese/dragon_blue.png'),
		white: require('../../../assets/icons_chinese/dragon_white.png'),
	},
	{
		name: 'Snake',
		blue: require('../../../assets/icons_chinese/snake_blue.png'),
		white: require('../../../assets/icons_chinese/snake_white.png'),
	},
	{
		name: 'Horse',
		blue: require('../../../assets/icons_chinese/horse_blue.png'),
		white: require('../../../assets/icons_chinese/horse_white.png'),
	},
	{
		name: 'Goat',
		blue: require('../../../assets/icons_chinese/goat_blue.png'),
		white: require('../../../assets/icons_chinese/goat_white.png'),
	},
	{
		name: 'Monkey',
		blue: require('../../../assets/icons_chinese/monkey_blue.png'),
		white: require('../../../assets/icons_chinese/monkey_white.png'),
	},
	{
		name: 'Rooster',
		blue: require('../../../assets/icons_chinese/rooster_blue.png'),
		white: require('../../../assets/icons_chinese/rooster_white.png'),
	},
	{
		name: 'Dog',
		blue: require('../../../assets/icons_chinese/dog_blue.png'),
		white: require('../../../assets/icons_chinese/dog_white.png'),
	},
	{
		name: 'Pig',
		blue: require('../../../assets/icons_chinese/pig_blue.png'),
		white: require('../../../assets/icons_chinese/pig_white.png'),
	},
]

const filters = [
	{
		options: ['Single', 'Commited'],
		title: 'Intent',
		iconName: 'relationship',
		name: 'relation_ship'
	},
	{
		options: ['Asian', 'Europe', 'Africa'],
		title: 'Ethnicity',
		iconName: 'ethnicity',
		name: 'ethnicity'
	},
	{
		options: ['Thin', 'Fat'],
		title: 'Body Type',
		iconName: 'body',
		name: 'body_type'
	},
	{
		options: Object.keys(countryAndCities) || [],
		title: 'Country',
		iconName: 'country',
		name: 'country'
	},
	{
		options: [],
		title: 'City',
		iconName: 'city',
		name: 'city'
	}
];
const LIMIT = 10;
class UserList extends UserListBase {
	static navigationOptions = ({ navigation }) => {
		const toggleModal = navigation.getParam('toggleModal', () => { });
		return {
			headerStyle: {
				elevation: 0, //remove shadow on Android
				shadowOpacity: 0,
				backgroundColor: '#F5F5F5',
				borderColor: '#C1C0C9',
				borderBottomWidth: 1
			},
			// headerTitle: () => (
			// 	<Image
			// 		style={{ width: 120, height: 50, flex: 1 }}
			// 		resizeMode="contain"
			// 		source={{ uri: 'icon_without_bg' }}
			// 	/>
			// ),
			// headerRight: () => (
			// 	<TouchableOpacity onPress={toggleModal}>
			// 		<Image
			// 			source={{ uri: 'filter_hori' }}
			// 			resizeMode="contain"
			// 			style={{ height: 15, width: 20, marginRight: 20 }}
			// 		/>
			// 	</TouchableOpacity>
			// )
			header: null
		};
	};

	constructor(props) {
		super(props)

		this.getMatches = memoizeOne(this.getMatches.bind(this))
	}

	bannerError = (e) => {
		console.log('-----error----->>>', e);
	};

	_renderFooter() {
		if (!this.props.refreshing) return null;

		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					paddingVertical: 10
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	}

	getMatches(type, kind, offset) {
		this.props.getMatches({
			type,
			kind,
			offset,
			limit: LIMIT,
			access_token: this.props.access_token,
			filters: this.props.filters
		});
	}


	render() {
		const { isModalVisible } = this.state;
		return this.props.loading ? (
			<Loading />
		) : (
				<View style={Local_styles.container}>
					{Header(<>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<View>
								<Text style={Local_styles.title}>Inzodiac</Text>
							</View>
							<TouchableOpacity style={{ height: 40, width: 40, marginRight: 20, justifyContent: 'center', borderRadius: 20 }} onPress={this.props.navigation.getParam('toggleModal', () => { })}>
								<Image
									source={require('../../../assets/filter.png')}
									resizeMode="contain"
									style={{ height: 25, width: 25, alignSelf: 'center' }}
								/>
							</TouchableOpacity>
						</View>
					</>, true, this.props
					)}

					{isModalVisible ? (
						<Modal
							animationType="slide"
							transparent={true}
							visible={isModalVisible}
							// backdropColor='transparent'
							onRequestClose={this.toggleModal}
							style={{ margin: 0 }}
						>
							<View style={{ flex: 1, backgroundColor: 'rgb(245,245,245)' }}>
								<View
									style={{
										flex: 1,
										backgroundColor: 'white',
										borderTopLeftRadius: 20,
										borderTopRightRadius: 20,
										elevation: 15,
									}}
								>

									{Header(<>
										<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
											<View>
												<Text style={Local_styles.title}>Filter</Text>
											</View>

											<TouchableOpacity onPress={() => {
												this.props.updateFilters(this.state.filters, this.props.access_token);
												this.toggleModal();
											}} style={{ marginRight: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

												<Text style={[Local_styles.title, { fontSize: 16 }]}>{Object.keys(this.state.applied).length}</Text>
												<Image source={require('../../../assets/filter.png')} resizeMode={'contain'} style={{marginLeft: 10, height: 25, width: 25}}/>

											</TouchableOpacity>
										</View>
									</>, true, false, this.toggleModal)}


									{/* <View
										style={{
											height: 50,
											borderBottomWidth: 1,
											borderColor: 'lightgray',
											width: '100%',
											justifyContent: 'space-between',
											flexDirection: 'row',
											alignItems: 'center'
										}}
									>
										<TouchableOpacity style={{ marginLeft: 20 }} onPress={this.toggleModal}>
											<Text style={{ color: 'gray', fontSize: 15 }}>Cancel</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={{ marginRight: 20 }}
											onPress={() => {
												this.props.updateFilters(this.state.filters, this.props.access_token);
												this.toggleModal();
											}}
										>
											<Text style={{ color: blueColor, fontSize: 15 }}>Done</Text>
										</TouchableOpacity>
									</View> */}
									{!this.state.show_horoscopes ?

										<ScrollView style={{ flex: 1, paddingTop: 30, paddingRight: 30, paddingLeft: 30 }}>
											<View
												style={{
													flexDirection: 'row',
													width: '100%',
													justifyContent: 'space-between',
													alignItems: 'center',
													marginBottom: 30
												}}
											>
												<DropDown
													options={[1, 0]}
													value={this.state.filters['gender']}
													setValue={this.setValue('gender')}
													defaultValue={"Looking For"}
													boolean={true}
												/>
											</View>
											<Slider
												from_age={this.state.filters['from_age']}
												to_age={this.state.filters['to_age']}
												setRange={this.setRange}
											/>
											{filters.map(({ options, title, iconName, name }, index) => (
												<View
													key={`filter_${index}`}
													style={{
														flexDirection: 'row',
														width: '100%',
														justifyContent: 'space-between',
														alignItems: 'center',
														marginBottom: 30
													}}
												>
													<DropDown
														options={
															name === 'city' &&
																this.state.filters.country &&
																countryAndCities[this.state.filters.country] ? (
																	countryAndCities[this.state.filters.country]
																) : (
																	options
																)
														}
														defaultValue={title}
														value={this.state.filters[name]}
														setValue={this.setValue(name)}
													/>
												</View>
											))}
											<Button
												title={this.props.preferred_horoscope_type}
												image="horoscope"
												styleTitle={{ color: 'gray', fontSize: 15, marginRight: 'auto' }}
												onPress={() => {
													this.setState({ show_horoscopes: true });
												}}
												style={{
													backgroundColor: '#FFF',
													borderColor: 'lightgray',
													borderWidth: 1,
													width: '100%',
													marginBottom: 50,
													height: 50,
													paddingLeft: 25,
													paddingRight: 25,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											/>
											<Button
												title="DONE"
												styleTitle={{ color: '#FFF', fontSize: 15, marginRight: 'auto', width: '100%', textAlign: 'center' }}
												// onPress={() => {
												// 	this.props.clearFilters(this.props.access_token);
												// }}
												onPress={()=>{
													this.props.updateFilters(this.state.filters, this.props.access_token);
													this.toggleModal()
												}}
												style={{
													backgroundColor: primary_color,
													borderColor: 'lightgray',
													borderWidth: 1,
													width: '100%',
													marginBottom: 50,
													height: 50,
													paddingLeft: 25,
													paddingRight: 25,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											/>
										</ScrollView>
										:

										<ScrollView style={{ flex: 1, paddingTop: 30, paddingRight: 30, paddingLeft: 30, }}>
											<View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
											{
												this.props.preferred_horoscope_type === 'Western'?
												
													western_horoscopes.map(({ name, blue, white }, index) => (
														console.log(name, this.state[name]) ,
													   <TouchableOpacity
													   
														   onPress={()=>this.setState({[name]: !this.state[name]  })}
														   key={`filter_${index}`}
														   style={{
															   justifyContent: 'center',
															   alignItems: 'center',
															   borderColor: 'lightgray',
															   borderWidth: 1,
															   backgroundColor: this.state[name]? primary_color: 'white',
															   maxHeight: 110,
															   marginVertical: 10,
															   borderRadius: 5,
															   width: '30%',
															   paddingVertical: 5,
														   }}
													   >
														   <Image source={this.state[name]?white:blue} resizeMode={'contain'} style={{ maxHeight: 50, width: '100%' }} />
													   <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>{name}</Text>
													   </TouchableOpacity>
												   ))
												:
												chinese_horoscope.map(({ name, blue, white }, index) => (
													console.log(name, this.state[name]) ,
												   <TouchableOpacity
												   
													   onPress={()=>this.setState({[name]: !this.state[name]  })}
													   key={`filter_${index}`}
													   style={{
														   justifyContent: 'center',
														   alignItems: 'center',
														   borderColor: 'lightgray',
														   borderWidth: 1,
														   backgroundColor: this.state[name]? primary_color: 'white',
														   maxHeight: 110,
														   marginVertical: 10,
														   borderRadius: 5,
														   width: '30%',
														   paddingVertical: 5,
													   }}
												   >
													   <Image source={this.state[name]?white:blue} resizeMode={'contain'} style={{ maxHeight: 50, width: '100%' }} />
												   <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>{name}</Text>
												   </TouchableOpacity>
											   ))

												
											}
											</View>

											<Button
												title="DONE"
												styleTitle={{  alignSelf: 'center', textAlign: 'center', width: '100%', color: '#FFF', fontSize: 15, marginRight: 'auto', }}
												onPress={() => {
													this.setState({show_horoscopes: false});
												}}
												style={{
													backgroundColor: primary_color,
													marginTop: 25,
													borderColor: 'lightgray',
													borderWidth: 1,
													width: '100%',
													marginBottom: 50,
													height: 50,
													paddingLeft: 25,
													paddingRight: 25,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											/>
										</ScrollView>
									}
								</View>
							</View>
						</Modal>
					) : (
							<View
								style={{ flex: 1, alignItems: 'center', }}
							>
								{/* <AdMobBanner
              bannerSize="fullBanner"
              adUnitID={isIos() ? "ca-app-pub-6258656412219552/4616828245" : "ca-app-pub-6258656412219552/9161226844"}
              testDeviceID={[AdMobBanner.simulatorId]}
              didFailToReceiveAdWithError={this.bannerError}
              style={{ width: "80%", height: 50 }}
            /> */}
								{/* <View
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
                > */}
								<FlatList
									data={this.props.matches}
									showsHorizontalScrollIndicator={false}
									style={{ width: '95%', marginVertical: 10 }}
									numColumns={2}
									onEndReached={(params) => {
										let { type, kind } = this.props.navigation.state.params;
										this.getMatches(
											type,
											kind,
											this.props.matches.length);
									}}
									refreshing={this.props.refreshing}
									ListFooterComponent={this._renderFooter}
									onEndReachedThreshold={0}
									renderItem={({ item: match, index }) => (
										<UserCard
											iconName={match.avatar.length > 0 ? match.avatar : profilePhoto}
											name={match.name}
											age={moment().diff(match.birthday, 'years')}
											location={`${match.city}, ${match.country}`}
											count={match.photos.length}
											myOwn={index == 0 ? true : false}
											navigateToUserProfile={this.navigateToUserProfile}
											key={`${index}`}
											index={index}
										/>
									)}
									keyExtractor={(item, index) => `userlist_${index}`}
								/>
							</View>
							// </View>
						)}
				</View>
			);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.matches.loading,
		err: state.matches.err,
		access_token: state.user.access_token,
		matches: state.matches.matches,
		filters: state.matches.filters,
		refreshing: state.matches.refreshing,
		preferred_horoscope_type: state.user.preferred_horoscope_type
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getMatches: ({ type, kind, offset = 0, limit = 30, access_token, filters, clean }) => {
			dispatch(getMatches({ type, kind, offset, limit, access_token, filters, clean }));
		},
		getFilters: (access_token) => {
			dispatch(getFilters(access_token));
		},
		updateFilters: (filters, access_token) => {
			dispatch(updateFilters(filters, access_token));
		},
		clearFilters: (access_token) => {
			dispatch(clearFilters(access_token));
		},
		dispatch
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

const primary_color = 'rgb(62, 45, 161)';

const Local_styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: backgroundColor,
	},
	header: {
		margin: '4%'
		// backgroundColor: 'red'
	},
	title: {
		// marginTop: 30,
		// marginLeft: 10,
		marginLeft: '1%',
		fontSize: 22,
		fontWeight: 'bold',
		color: '#FFF',
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
