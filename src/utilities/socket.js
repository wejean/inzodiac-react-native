import config from '../config';
import io from 'socket.io-client';
/**
 * creates a JSON of socket subscription over each view/list
 *  ViewIdSubscriptionMap = {"viewName":[groupIds]}
 * */
let ViewIdSubscriptionMap = {};
let socket = undefined;

export function connectToSocket() {
	return new Promise((resolve, reject) => {
		const options = {
			transports: [ 'websocket' ],
			reconnection: true,
			reconnectionDelay: 500
		};

		socket = io.connect(config.SERVER_SOCKET_URL, options);
		socket.on('connect', () => {
			for (let [ viewName, groupIds ] of Object.entries(ViewIdSubscriptionMap)) {
				subscribeGroups(groupIds);
			}
		});

		socket.on('disconnect', () => {
			console.log('Socket disconnect');
		});

		socket.on('subscription_id', (data) => {
			resolve(data);
		});

		socket.on('error', (err) => {
			//showSnackbar("Socket error");
			reject(err);
		});

		socket.on('connect_error', (err) => {
			//showSnackbar("Socket connect_error");
			reject(err);
		});
	});
}

export function disconnectSocket() {
	socket.disconnect();
}

export function saveSubscriptionInfo(viewName, groupIds) {
	ViewIdSubscriptionMap[viewName] = ViewIdSubscriptionMap[viewName] || [];

	if (groupIds && groupIds.length > 0) {
		for (let groupId of groupIds) {
			if (!ViewIdSubscriptionMap[viewName].indexOf(groupId) >= 0) ViewIdSubscriptionMap[viewName].push(groupId);
		}
	}

	// console.log("SaveSub->", viewName, " --- ", ViewIdSubscriptionMap);
	subscribeGroups(groupIds);
}

export function unSubscribeSockets(viewName) {
	let groupIds = ViewIdSubscriptionMap[viewName];
	delete ViewIdSubscriptionMap[viewName];
	if (!groupIds || groupIds.length < 1) {
		return;
	}
	/**
   * check for groupId exists for some other view or not,
   * and unsubscribe socket if it is not not used for other view.
   * */
	if (!isInViewIdSubscriptionMap(groupIds)) {
		unSubscribeGroups(groupIds);
	}
}

export function onSocketData(groupId, viewName, onData) {
	socket.on('updateInRow', (socketData) => {
		let { group } = socketData;

		if (group === groupId) {
			return onData(socketData);
		}
	});
}

function subscribeGroups(groups) {
	socket.emit('subscribe', groups);
}

function unSubscribeGroups(groups) {
	console.log('un ______________________-', groups);
	socket.emit('unsubscribe', groups);
}

/**
 * check for groupId exists for some other view or not
 * */
function isInViewIdSubscriptionMap(groupIds) {
	for (let groupId of groupIds) {
		for (let groupIdArray of Object.values(ViewIdSubscriptionMap)) {
			if (groupIdArray && groupIdArray.indexOf(groupId) >= 0) {
				return true;
			}
		}
	}
	return false;
}
