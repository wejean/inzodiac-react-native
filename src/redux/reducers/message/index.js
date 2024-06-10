import {
	MESSAGE_LIST_SUCCESS,
	MESSAGE_LIST_FAIL,
	MESSAGE_LIST,
	GET_CHAT_MESSAGE_LIST_SUCCESS,
	APPEND_MESSAGE,
	MESSAGE_LIST_SUCCESS_CLEAN,
	RESET_MESSAGE,
	GET_CHAT_MESSAGE_LIST_SUCCESS_CLEAN
} from '../../actions/message';

const initialState = {
	messageList: [],
	err: {},
	chatMessageList: {},
	loading: false
};

const getKey = (a, b) => [a, b].sort().join("_")

export const message = (state = initialState, action) => {
	switch (action.type) {
		case MESSAGE_LIST:
			return Object.assign({}, state, { loading: true, refreshing: true });
		case MESSAGE_LIST_SUCCESS:
			return Object.assign({}, state, {
				messageList: state.messageList.concat(action.payload),
				loading: false
			});
		case MESSAGE_LIST_SUCCESS_CLEAN:
			return Object.assign({}, state, {
				messageList: action.payload,
				loading: false
			});
		case MESSAGE_LIST_FAIL:
			return Object.assign({}, state, {
				err: action.payload,
				loading: false,
				refreshing: false
			});
		case GET_CHAT_MESSAGE_LIST_SUCCESS_CLEAN:
			{
				const key = getKey(action.payload.userId, action.payload.senderId)
				return Object.assign({}, state, {
					chatMessageList: Object.assign({}, state.chatMessageList, {
						[key]: action.payload.data
					}),
					refreshing: false
				})
			}
		case GET_CHAT_MESSAGE_LIST_SUCCESS:
			{
				const key = getKey(action.payload.userId, action.payload.senderId)
				return Object.assign({}, state, {
					chatMessageList: Object.assign({}, state.chatMessageList, {
						[key]: [...(state.chatMessageList[key] ? state.chatMessageList[key] : []), ...action.payload.data]
					}),
					refreshing: false
				})
			}
		case APPEND_MESSAGE:
			{
				const key = getKey(action.payload.sender, action.payload.receiver)
				return Object.assign({}, state, {
					chatMessageList: Object.assign({}, state.chatMessageList, {
						[key]: [action.payload, ...state.chatMessageList[key]]
					})
				})
			}
		case RESET_MESSAGE:
			return initialState
		default:
			return state;
	}
};
