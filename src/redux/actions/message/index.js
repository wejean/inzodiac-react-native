import { callApi } from '../../../api';
import get from 'lodash'

export const MESSAGE_LIST = 'MESSAGE_LIST';

export const MESSAGE_LIST_SUCCESS = 'MESSAGE_LIST_SUCCESS';

export const MESSAGE_LIST_SUCCESS_CLEAN = 'MESSAGE_LIST_SUCCESS_CLEAN';

export const MESSAGE_LIST_FAIL = 'MESSAGE_LIST_FAIL';

export const GET_CHAT_MESSAGE_LIST_SUCCESS = 'GET_CHAT_MESSAGE_LIST_SUCCESS';

export const GET_CHAT_MESSAGE_LIST_SUCCESS_CLEAN = 'GET_CHAT_MESSAGE_LIST_SUCCESS_CLEAN';

export const APPEND_MESSAGE = 'APPEND_MESSAGE'

export const RESET_MESSAGE = 'RESET_MESSAGE'

export const getMessageList = ({ status, offset, limit, access_token, userId }) => {
	return (dispatch) => {
		dispatch({ type: MESSAGE_LIST, paload: {} });
		return callApi(
			'post',
			'getChat',
			{ status, offset, limit, userId },
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				// Authorization: `Bearer ${access_token}`
			},
			true
		)
			.then((result) => {
				dispatch({
					type: MESSAGE_LIST_SUCCESS_CLEAN,
					payload: result.data
				});
			})
			.catch((error) => {
				dispatch({ type: MESSAGE_LIST_FAIL, payload: error.response.data.message });
			});
	};
};

export const getChatMessageList = ({ skip, limit, userId, senderId }) => {
	return (dispatch) => {
		dispatch({ type: MESSAGE_LIST, paload: {} });
		return callApi(
			'post',
			'getChatMessages',
			{ skip, limit, userId, senderId },
			{
				'content-type': 'application/json',
				Accept: 'application/json',
			},
			true
		)
			.then((result) => {
				dispatch({
					type: skip === 0 ? GET_CHAT_MESSAGE_LIST_SUCCESS_CLEAN : GET_CHAT_MESSAGE_LIST_SUCCESS,
					payload: { data: result.data, userId, senderId },
					userId,
					senderId
				});
			})
			.catch((error) => {
				console.log("---error--->>>", error);
				dispatch({ type: MESSAGE_LIST_FAIL, payload: get(error, 'response.data.message', '') });
			});
	};
};

export const startChat = ({ senderId, receiverId, message }) => {
	return (dispatch) => {
		// dispatch({ type: MESSAGE_LIST, paload: {} });
		dispatch({
			type: APPEND_MESSAGE,
			payload: {
				sender: senderId,
				receiver: receiverId,
				message: message,
				time: new Date()
			}
		});
		return callApi(
			'post',
			'startChat',
			{ senderId, receiverId, message },
			{
				'content-type': 'application/json',
				Accept: 'application/json',
			},
			true
		)
			.then((result) => {
				// dispatch({
				// 	type: APPEND_MESSAGE,
				// 	payload: {
				// 		sender: senderId,
				// 		receiver: receiverId,
				// 		message: message,
				// 		time: new Date()
				// 	}
				// });
			})
			.catch((error) => {
				dispatch({ type: MESSAGE_LIST_FAIL, payload: error.response.data.message });
			});
	};
};
