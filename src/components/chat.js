import React, { Component, Fragment, useCallback } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	AppState,
	Keyboard,
	Animated,
	ActivityIndicator
} from 'react-native';
import SelfMessage from './selfMessage';
import ReceivedMessage from './receivedMessage';
// import Store from './../utilities/store';
import styles from '../../style';
import Button from './button';
// import TextInput from './TextInput';
import withSocket from './../components/withSocket';
import moment from 'moment';
// import { Header } from './varIHeader';
import { isEmpty } from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
// import {
// 	ITEM_I_REQUEST_SUCCESS,
// 	USER_UPDATE_REQUEST_SUCCESS,
// 	ADD_ITEM_I_REQUEST_SUCCESS,
// 	UPDATE_MY_ITEM_REQUEST_SUCCESS,
// 	UPDATE_ITEM_I_REQUEST_SUCCESS
// } from '../redux/constants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { isIphoneX, isIos, isIphoneSE } from '../utilities/common';
// import { get, isString } from 'lodash';
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import memoizeOne from 'memoize-one'
import { getChatMessageList, startChat } from '../redux/actions/message'
// import { getReduxKey } from '../redux';
// import { callApi } from '../utilities/serverApi';
const profilePhoto = require('../assets/img/profile_photo.png');


const getKey = (a, b) => [a, b].sort().join("_")

class Chat extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: () => {
			const { name, avatar } = navigation.state.params
			return (
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						height: 60,
						paddingLeft: 10,
						paddingRight: 10,
						width: '100%',
						backgroundColor: 'rgb(245,245,245)',
						borderBottomColor: '#707070',
						borderBottomWidth: 1
					}}
				>
					<Icon
						name="arrowleft"
						color={'#222124'}
						size={20}
						onPress={() => {
							navigation.goBack();
						}}
					/>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							flex: 1,
							paddingLeft: 10
						}}
					>
						<View style={{ paddingRight: 15 }}>
							<Image source={avatar ? { uri: avatar } : profilePhoto} style={{ height: 40, width: 40, borderRadius: 20 }} />
						</View>
						<Text style={styles.headerText}>{name}</Text>
					</View>
					<MaterialIcon
						name="dots-horizontal"
						color={'#222124'}
						size={25}
						onPress={() => {
							navigation.goBack();
						}}
					/>
				</View>
			);
		}
	});

	constructor(props) {
		super(props);
		this.state = {
			appState: AppState.currentState,
			filter: {},
			receiverAvailable: false,
			itemsIRequested: [],
			updatedRequestedItem: null,
			options: {
				limit: 20,
				skip: 0,
				sort: { createdOn: -1 }
			},
			count: 0,
			unreadMessage: 0,
			// userId: this.props.navigation.state.params.sender._id,,
			// userId,
			messageList: [
				{ _id: 1, senderId: 1, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 3, senderId: 1, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 4, senderId: 12, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 5, senderId: 1, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 5, senderId: 1, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 7, senderId: 12, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 8, senderId: 1, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' },
				{ _id: 10, senderId: 12, messageText: 'heya heya this is my first message', createdOn: '12/10/2019' }
			],
			height: 36
		};
		this._renderHeader = this._renderHeader.bind(this)
		this.onEndReached = this.onEndReached.bind(this)
		this.getChatMessages = memoizeOne(this.getChatMessages.bind(this))
	}

	// componentWillReceiveProps = (nextProps) => {
	// let { product } = this.props.navigation.state.params;
	// let { dispatch } = this.props;
	// if (
	// 	nextProps.socketData.newMessage &&
	// 	product._id === nextProps.socketData.newMessage.productId &&
	// 	nextProps.socketData.newMessage.receiverId === this.state.userId
	// ) {
	// 	if (nextProps.socketData.requestedItem) {
	// 		if (nextProps.socketData.requestedItem.ownerId._id === this.state.userId) {
	// 			dispatch({
	// 				type: UPDATE_MY_ITEM_REQUEST_SUCCESS,
	// 				payload: nextProps.socketData.requestedItem
	// 			});
	// 		} else {
	// 			dispatch({
	// 				type: UPDATE_ITEM_I_REQUEST_Srgb(245,245,245)UCCESS,
	// 				payload: nextProps.socketData.requestedItem
	// 			});
	// 		}
	// 	}
	// 	this.state.messageList.unshift(nextProps.socketData.newMessage);
	// }
	// };
	// componentWillMount = () => {
	// this.state.myItemsRequested = this.props.myItemsRequested;
	// let { receiver, sender, product } = this.props.navigation.state.params;
	// let uniqueId = [ sender._id, receiver._id, product._id ].sort().join('');
	// this.state.userId = sender._id;
	// Store.getInstance().setKey('ActiveScreen', {
	// 	screenName: 'Chat',
	// 	uniqueId
	// });
	// this.getMessages(product._id, sender._id, receiver._id);
	// let owner = isString(product.ownerId) ? product.ownerId : product.ownerId._id;
	// let filter =
	// 	owner === sender._id
	// 		? {
	// 				productId: product._id,
	// 				ownerId: sender._id,
	// 				requestedUserId: receiver._id
	// 			}
	// 		: {
	// 				productId: product._id,
	// 				requestedUserId: sender._id,
	// 				ownerId: receiver._id
	// 			};
	// callApi('put', 'message/', {
	// 	productId: product._id,
	// 	receiverId: sender._id,
	// 	senderId: receiver._id,
	// 	filter
	// })
	// 	.then((data) => {
	// 		if (data.data && data.data.requestedItem) {
	// 			if (owner === sender._id) {
	// 				this.props.dispatch({
	// 					type: UPDATE_MY_ITEM_REQUEST_SUCCESS,
	// 					payload: data.data.requestedItem
	// 				});
	// 			} else {
	// 				this.props.dispatch({
	// 					type: UPDATE_ITEM_I_REQUEST_SUCCESS,
	// 					payload: data.data.requestedItem
	// 				});
	// 			}
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.warn('there is some error---->', JSON.stringify(err.response, null, 5));
	// 	});
	// };
	// _handleAppStateChange = (nextAppState) => {
	// let { receiver, sender, product } = this.props.navigation.state.params;
	// let data = {};
	// let productId = product._id;
	// let senderId = sender._id;
	// let receiverId = receiver._id;
	// let uniqueId = [ senderId, receiverId, productId ].sort().join('');
	// if (this.state.appState.match(/active/) && (nextAppState === 'background' || nextAppState === 'inactive')) {
	// 	data = {
	// 		available: ''
	// 	};
	// } else if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
	// 	data = { available: uniqueId };
	// }
	// if (!isEmpty(data)) {
	// 	callApi('put', 'message/UserStatusSocket', data)
	// 		.then((response) => {
	// 			if (data.available !== '') {
	// 				callApi('put', 'message/', {
	// 					productId: product._id,
	// 					receiverId: sender._id,
	// 					senderId: receiver._id
	// 				})
	// 					.then((data) => {})
	// 					.catch((err) => {
	// 						console.log('there is some error in updating the message status', err);
	// 					});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log('there is some error in changing status of receiver ', err);
	// 		});
	// }
	// this.setState({ appState: nextAppState });
	// };

	// componentWillUnmount = () => {
	// AppState.removeEventListener('change', this._handleAppStateChange);
	// let { dispatch } = this.props;
	// if (this.state.updatedRequestedItem && this.state.updatedRequestedItem.ownerId._id === this.state.userId) {
	// 	dispatch({
	// 		type: UPDATE_MY_ITEM_REQUEST_SUCCESS,
	// 		payload: this.state.updatedRequestedItem
	// 	});
	// } else if (
	// 	this.state.updatedRequestedItem &&
	// 	this.state.updatedRequestedItem.requestedUserId._id === this.state.userId
	// ) {
	// 	dispatch({
	// 		type: UPDATE_ITEM_I_REQUEST_SUCCESS,
	// 		payload: this.state.updatedRequestedItem
	// 	});
	// }
	// Store.getInstance().setKey('ActiveScreen', {});
	// let { receiver, sender, product } = this.props.navigation.state.params;
	// let productId = product._id;
	// let senderId = sender._id;
	// let receiverId = receiver._id;
	// callApi('put', 'message/UserStatusSocket', {
	// 	productId,
	// 	senderId,
	// 	receiverId,
	// 	available: ''
	// })
	// 	.then((response) => {})
	// 	.catch((err) => {
	// 		console.log('there is some error in changing status of receiver ', err);
	// 	});
	// };
	componentDidMount() {
		let { memberId, userId } = this.props.navigation.state.params
		this.props.getChatMessageList({ userId, senderId: memberId, limit: 10, skip: 0 })
		// 	AppState.addEventListener('change', this._handleAppStateChange);
		// 	let { receiver, sender, product } = this.props.navigation.state.params;
		// 	this.state.filter = {
		// 		receiverId: receiver._id,
		// 		senderId: sender._id,
		// 		productId: product._id
		// 	};
		// 	let uniqueId = [ sender._id, receiver._id, product._id ].sort().join('');
		// 	let activeScreen = Store.getInstance().getKey('ActiveScreen');
		// 	if (!isEmpty(activeScreen)) {
		// 		Store.getInstance().setKey('ActiveScreen', {});
		// 	}
		// 	Store.getInstance().setKey('ActiveScreen', {
		// 		screenName: 'Chat',
		// 		uniqueId
		// 	});
		// 	let id = get(getReduxKey('user'), 'user.user._id', 'undefined');
		// 	let filter = {
		// 		productId: product._id,
		// 		senderId: { $in: [ sender._id, receiver._id ] },
		// 		receiverId: { $in: [ sender._id, receiver._id ] },
		// 		deleteBy: { $ne: id }
		// 	};
		// 	callApi('get', 'message/count', filter)
		// 		.then((response) => {
		// 			this.state.count = response.data;
		// 		})
		// 		.catch((error) => {
		// 			console.warn('error', JSON.stringify(error.response.data, null, 5));
		// 		});
		// }
		// getMessages = (productId, senderId, receiverId) => {
		// 	let { options, limit } = this.state;
		// 	let filter = {
		// 		productId,
		// 		senderId: { $in: [ senderId, receiverId ] },
		// 		receiverId: { $in: [ senderId, receiverId ] }
		// 	};
		// 	let query = { filter, options };
		// 	callApi('get', 'message', query)
		// 		.then((response) => {
		// 			if (response.data.success) {
		// 				return;
		// 			}
		// 			this.state.messageList = this.state.messageList.concat(...response.data);
		// 			this.setState({});
		// 		})
		// 		.catch((err) => {
		// 			alert('ERROR!');
		// 		});
	}

	// getNewMessagesOnScroll = () => {
	// let { receiver, sender, product } = this.props.navigation.state.params;
	// if (this.state.count.count > this.state.options.skip) {
	// 	this.state.options.skip += this.state.options.limit;
	// 	this.setState({}, () => {
	// 		this.getMessages(product._id, sender._id, receiver._id);
	// 	});
	// }
	// };
	sendMessage = (messageText) => {
		if (messageText.trim().length === 0) {
			return;
		}
		const { userId, memberId } = this.props.navigation.state.params;
		this.props.startChat({ senderId: userId, receiverId: memberId, message: messageText })

		// this.state.userId;
		// let { filter } = this.state;
		// let date = Date.now();
		// let messageState = {
		// 	senderId: filter.senderId,
		// 	receiverId: filter.receiverId,
		// 	productId: filter.productId,
		// 	createdOn: date,
		// 	messageText: messageText.trim(),
		// 	_id: Math.random() * 100000 + 'a'
		// };
		// let data = {
		// 	...filter,
		// 	messageText: messageText.trim(),
		// 	createdOn: date
		// };
		// callApi('post', 'message', data)
		// 	.then((response) => {
		// 		this.state.updatedRequestedItem = response.data.requestedItem;
		// 		if (this.state.userId !== response.data.requestedItem.ownerId._id) {
		// 			let { dispatch } = this.props;
		// 			dispatch({
		// 				type: ADD_ITEM_I_REQUEST_SUCCESS,
		// 				payload: response.data.requestedItem
		// 			});
		// 		}
		// 		if (response.data.message.productId) {
		// 			this.state.messageList.unshift(messageState);
		// 			this.setState({});
		// 		} else {
		// 			this.state.messageList.shift();
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		this.state.messageList.shift();
		// 		if (err.response.data.message) {
		// 			alert(err.response.data.message);
		// 			this.props.navigation.goBack();
		// 		}
		// 	});
	};

	_renderHeader() {
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

	onEndReached(params) {
		let { userId, memberId } = this.props.navigation.state.params;
		const key = getKey(userId, memberId)
		this.props.chatMessageList[key] && this.props.chatMessageList[key].length > 9 && this.getChatMessages(this.props.chatMessageList[key].length)
	}

	getChatMessages(skip) {
		let { userId, memberId } = this.props.navigation.state.params;
		this.props.getChatMessageList({ userId, senderId: memberId, limit: 10, skip })
	}
	render() {
		let { messageList } = this.state;
		let { userId, memberId, avatar } = this.props.navigation.state.params;
		const key = getKey(userId, memberId)
		const chatMessageList = this.props.chatMessageList[key]
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgb(245,245,245)',
					marginBottom: isIphoneX() ? 30 : 0
				}}
			>
				<View style={[LOCAL_STYLES.chatContainer]}>
				{!chatMessageList.errno?

					<FlatList
						inverted={true}
						onEndReached={this.onEndReached}
						ListFooterComponent={this._renderHeader}
						onEndReachedThreshold={0}
						// keyExtractor={(item, index) => item.id || index}
						data={this.props.chatMessageList[key]}
						renderItem={({ item, index }) => {
							return item.sender === userId ? (
								<SelfMessage
									text={item.message}
									profilePhoto={this.props.avatar ? { uri: this.props.avatar } : profilePhoto}
									date={
										moment(item.time).isSame(moment(), 'day') ? (
											moment(item.time).format('[Today] HH:mm')
										) : (
												moment(item.time).format('HH:mm')
											)
									}
									key={index}
									showImage={
										(!this.props.chatMessageList[key][index + 1] || this.props.chatMessageList[key][index + 1].sender !== userId)
									}
								/>
							) : (
									<SelfMessage
										text={item.message}
										profilePhoto={avatar ? { uri: avatar } : profilePhoto}
										date={
											moment(item.time).isSame(moment(), 'day') ? (
												moment(item.time).format('[Today] HH:mm')
											) : (
													moment(item.time).format('HH:mm')
												)
										}
										key={item.id}
										receiver={true}
										showImage={
											(!this.props.chatMessageList[key][index + 1] || this.props.chatMessageList[key][index + 1].receiver !== item.receiver)
										}
									// hideImage={
									// 	item.senderId === messageList[index - 1] && messageList[index - 1].senderId
									// }
									/>
									// <ReceivedMessage
									// 	text={item.message}
									// 	date={
									// 		moment(item.time).isSame(moment(), 'day') ? (
									// 			moment(item.item).format('[Today] HH:mm')
									// 		) : (
									// 				moment(item.item).format('HH:mm')
									// 			)
									// 	}
									// 	key={item.id}
									// hideImage={
									// 	item.senderId === messageList[index - 1] && messageList[index - 1].senderId
									// }
									// image={profilePhoto}
									// image={this.props.navigation.state.params.receiver.profileImage}
									// fbProfileImage={this.props.navigation.state.params.receiver.fbProfileImage}
									// />
								);
						}}
					/>
					:
					null
				}
				</View>
				<InputBox sendMessage={this.sendMessage} />
			</View>
		);
	}
}
// class ChatWrapper extends Component {
// 	render() {
// 		let { product, sender, receiver } = get(this.props, 'navigation.state.params', {});
// 		let productId = product ? product._id : '';
// 		let senderId = sender ? sender._id : '';
// 		let receiverId = receiver ? receiver._id : '';
// 		let uniqueId = [ senderId, receiverId, productId ].sort().join('');
// 		const ChatCustomComponent = withSocket(
// 			{
// 				viewName: `Chat-${uniqueId}`,
// 				groupIds: uniqueId ? [ `Chat-${uniqueId}` ] : [ 'Chat-123' ]
// 			},
// 			Chat
// 		);
// 		return <ChatCustomComponent {...this.props} />;
// 	}
// }
// function mapStateToProps(state) {
// 	return {};
// }

const mapDispatchToProps = (dispatch, ownProps) => ({
	getChatMessageList: ({ userId, senderId, limit, skip }) => {
		dispatch(getChatMessageList({ userId, senderId, limit, skip }))
	},
	startChat: ({ senderId, receiverId, message }) => {
		dispatch(startChat({ senderId, receiverId, message }))
	}
})

const mapStateToProps = (state, ownProps) => ({
	chatMessageList: state.message.chatMessageList,
	avatar: state.user.avatar,
	username: state.user.name,
	refreshing: state.message.refreshing
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
class InputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			keyboardHeight: new Animated.Value(0),
			height: 40
		};
		this.messageSent = false;
	}

	componentDidMount() {
		this.kbe1 = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
		this.kbe2 = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
	}

	_keyboardWillShow = (event) => {
		Animated.timing(this.state.keyboardHeight, {
			toValue: isIos() ? (isIphoneX() ? event.endCoordinates.height - 140 : event.endCoordinates.height - 2) : 5,
			duration: 100
		}).start();
	};

	_keyboardWillHide = (event) => {
		Animated.timing(this.state.keyboardHeight, {
			toValue: 0,
			duration: 100
		}).start();
	};
	updateSize = (height) => {
		console.log('-----height is -->>>', height);
		this.setState({
			height
		});
	};
	render() {
		let { message, height } = this.state;
		return (
			<Fragment>
				<View
					style={[
						{ height: height },
						LOCAL_STYLES.textFieldContainer,
						{ paddingHorizontal: isIphoneSE() ? 10 : 0, width: '100%' }
					]}
				>
					<EntypoIcon
						name="attachment"
						color={'#707070'}
						style={{ padding: 10 }}
						size={20}
						onPress={() => {
							// navigation.goBack();
						}}
					/>
					<TextInput
						maxHeight={200}
						autogrow={true}
						multiline={false}
						editable={true}
						value={message}
						placeholder="Type your message"
						maxLength={300}
						style={{ color: '#707070', width: '79%', fontFamily: 'SFUIDisplay-Regular' }}
						placeholderTextColor="#707070"
						// underlineColorAndroid={'transparent'}
						onChangeText={(message) => this.setState({ message })}
						onSubmitEditing={() => {
							this.props.sendMessage(this.state.message);
							this.setState({ message: '' });
						}}
						onContentSizeChange={(e) => {
							let contentSize = e.nativeEvent.contentSize.height;
							if (contentSize > 40) this.updateSize(contentSize);
						}}
						secureTextEntry={false}
					/>
					<IoniconsIcon
						name="ios-send"
						color={'#707070'}
						style={{ padding: 10 }}
						size={25}
						onPress={() => {
							this.props.sendMessage(this.state.message)
							this.setState({ message: '' });
						}}
					/>
				</View>

				<Animated.View
					style={{
						height: this.state.keyboardHeight
					}}
				/>
			</Fragment>
		);
	}
}

// const InternalHeader = (props) => {
// 	console.log('the props of the header is---->>>', header);
// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				alignItems: 'center',
// 				flexDirection: 'row',
// 				backgroundColor: 'red',
// 				justifyContent: 'flex-start',
// 				marginHorizontal: 16,
// 				height: 44,
// 				width: '100%'
// 			}}
// 		>
// 			<TouchableOpacity
// 				onPress={() => {
// 					props.navigation.goBack();
// 				}}
// 				style={{
// 					width: 30,
// 					height: 30,
// 					borderRadius: 15,
// 					backgroundColor: 'rgba(0,0,0,0.25)',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					position: 'absolute',
// 					zIndex: 2
// 				}}
// 			>
// 				<MaterialIcon name="arrow-left" color="white" size={15} />
// 			</TouchableOpacity>
// 			<View
// 				style={{
// 					alignItems: 'center',
// 					flex: 1
// 				}}
// 			>
// 				<Text style={styles.headerText}>{props.ownerName}</Text>
// 			</View>
// 		</View>
// 	);
// };
const LOCAL_STYLES = StyleSheet.create({
	chatContainer: {
		marginTop: 20,
		marginBottom: 10,
		flex: 1,
		backgroundColor: 'rgb(245,245,245)'
		// height: 600,
	},
	textFieldContainer: {
		// height: 48,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'white',
		width: '100%',
		color: 'red'
	}
});
