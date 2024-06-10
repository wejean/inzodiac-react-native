import { saveSubscriptionInfo, onSocketData, unSubscribeSockets } from './../utilities/socket';
import React, { Component } from 'react';
import { isArray } from 'lodash';

export default function withSocket({ viewName, groupIds }, Comp) {
	return class Socket extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		UNSAFE_componentWillMount() {
			if (isArray(groupIds)) {
				saveSubscriptionInfo(viewName, groupIds);
			}
			for (let id of groupIds) {
				onSocketData(id, viewName, (data) => {
					this.setState({ socketData: data.data });
				});
			}
		}
		componentWillUnmount() {
			if (isArray(groupIds)) {
				unSubscribeSockets(viewName);
			}
		}
		render() {
			return <Comp socketData={this.state.socketData} {...this.props} />;
		}
	};
}
