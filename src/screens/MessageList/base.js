import React, { Component } from 'react';

export default class MessagelistBase extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		// this.props.getMessageList({ status: 0, offset: 0, limit: 10, access_token: this.props.access_token, userId: this.props.userId });
		const { addListener } = this.props.navigation
		const self = this
		this.willFocus = addListener('willFocus', () => {
			self.props.getMessageList({ status: 0, offset: 0, limit: 10, access_token: self.props.access_token, userId: self.props.userId });
		})
	};
	componentWillUnmount() {
		this.willFocus.remove()
	}
}
