import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from '../../../style';
import { connect } from 'react-redux';
import { getMessageList } from '../../redux/actions/message';
import MessagelistBase from './base';
import Loading from '../loading';
import Header from '../../components/Header';

const profilePhoto = require('../../assets/img/profile_photo.png');
let messages = [
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
	{ name: 'rashi', time: new Date(), lastMessage: "Lorem ipsum" },
];
class MessageList extends MessagelistBase {
	static navigationOptions = ({ navigation }) => ({
		header: () => null
	});


	render() {
		return this.props.loading ? (
			<Loading />
		) : (
				<ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
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
								}}>Message</Text>
								<Text style={{
									marginLeft: '1%',
									color: '#FFFFFF',
									fontSize: 14,
									letterSpacing: 1,
									marginTop: 3,
									fontFamily: 'SFUIDisplay-Regular'
								}}>
									Messages Unread
								</Text>
							</View>
						)
					}
					<View style={{ flex: 1 }}>
						{messages.length ? (
							messages.map((item, index) => {
								return (
									<TouchableOpacity
										key={`messageList-${item.id || +new Date()}`}
										style={{
											padding: 10,
											marginTop: 20,
										}}
										onPress={() => {
											this.props.navigation.navigate('Message', item);
										}}
									>
										<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
											<View style={{ width: 60, height: 60, borderRadius: 30 }}>
												<Image
													source={item.avatar ? { uri: item.avatar } : profilePhoto}
													style={{ height: '100%', width: '100%', borderRadius: 30 }}
												/>
												<Image />
											</View>
											<View style={{
												width: "100%",
												paddingLeft: 10,
												paddingRight: 10,
												justifyContent: 'space-around',
												flex: 1
											}}>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between'
													}}
												>
													<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
														<Text style={local_styles.messageName}>{item.name}</Text>
														{/* {item.unreadMessageCount ? (<View
															style={{
																height: 10,
																width: 10,
																borderRadius: 5,
																backgroundColor: 'red',
																marginLeft: 10,
																marginTop: 5
															}}
														/>) : null} */}
													</View>
													<Text style={[local_styles.messageName, {color: 'gray'}]}>{moment(new Date(item.time)).format("hh:mm")}</Text>
												</View>
												<Text style={{color: 'gray'}}>{item.lastMessage}</Text>
											</View>
										</View>
									</TouchableOpacity>
								);
							})
						) : (
								<View style={{ flex: 1, justifyContent: 'center', marginTop: 50, alignItems: 'center' }}>
									<Text style={local_styles.title}>No Message found !!</Text>
								</View>
							)}
					</View>
				</ScrollView >
			);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.message.loading,
		err: state.message.err,
		access_token: state.user.access_token,
		userId: state.user.id,
		messageList: state.message.messageList,
		avatar: state.user.avatar,
		username: state.user.name
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getMessageList: ({ status = 0, offset = 0, limit = 30, access_token, userId }) => {
			dispatch(getMessageList({ status, offset, limit, access_token, userId }));
		},
		dispatch
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
const local_styles = StyleSheet.create({
	title: {
		// marginTop: 30,
		// marginLeft: 10,
		marginLeft: '1%',
		fontSize: 22,
		fontFamily: 'AirbnbCerealApp-Bold'
	},
	messageName: {
		fontSize: 14,
		fontFamily: 'SFUIDisplay-Bold'
	}
});
