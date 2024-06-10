import React, { Component } from 'react';

export default class HoroScopeBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: 'chinese',
			isModalVisible: false
		};
	}
	changeSelectedOption = (item) => {
		this.setState({ selectedOption: item });
	};
}
