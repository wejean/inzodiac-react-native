import React, { Component } from 'react';

const onTabChange = function(isEastern) {
	const { navigation } = this.props;
	if (this.state.isEastern !== isEastern)
		this.setState({ isEastern }, () => {
			navigation.setParams({ isEastern: this.state.isEastern });
		});
};
export default class HomeBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEastern: true
		};
		this.onTabChange = onTabChange.bind(this);
	}

	componentDidMount() {
		const { navigation } = this.props;
		navigation.setParams({ onTabChange: this.onTabChange });
	}
	onPressCategory = (selectedCategory) => {
		console.log('on Presssss');
		this.props.navigation.navigate('UserList', {
			type: this.state.isEastern ? 'eastern' : 'western',
			kind: selectedCategory
		});
	};
}
